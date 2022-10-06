<template>
  <div
    class="main"
    :style="{zIndex:9999,
             width:style.width+'px',
             height:style.height+'px',
             top:style.top+'px',
             left:style.left+'px',
             transform,
             fontSize:style.fontSize+'px',
             borderWidth:style.borderWidth+'px'}"
    @dblclick="handleDBclick">
    <ElInput
      v-if="textareaFocused"
      ref="textareaRef"
      type="textarea"
      class="edit-textarea"
      v-model="currentComp.value"
      @change="handleValueChange"
      @blur="handleBlur"
      :rows="1"
      :style="{
        ...style,
        width,
        height,
        top:0,
        left:0,
        lineHeight:style.lineHeight,
        fontSize:style.fontSize+'px'
      }"></ElInput>
    <!--  拖拽组件的有效蒙层 -->
    <div
      v-else
      class="eventMask"
      :style="{width, height}"
      @mousedown="handleMouseDown"
      @contextmenu="handleContextMenu"></div>
    <!-- 选中组件的边界线 -->
    <AreaLine :styles="{width,height}" />
    <!-- 拉伸组件的八个点 -->
    <AreaPoint :styles="{width,height,transform: `scale(${100/zoom})`}" />
    <RightMenu
      v-if="showContextMenu"
      :styles="{ top: 2,
                 left: parseInt(width) / 2,
                 transform: `scale(${100 / zoom}) rotate(${0 - style.transform}deg)`}"
      @submit="submitContextMenu" />
  </div>
</template>

<script>

import AreaLine from './AreaLine.vue'
import AreaPoint from './AreaPoint.vue'
import RightMenu from './rightMenu.vue'
export default {
  components: {
    AreaLine, AreaPoint, RightMenu
  },
  props: {
    selectedIndex: {
      type: Number,
      required: true
    },
    zoom: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      textareaFocused: false,
      showContextMenu: false,
      currentComp: {}
    }
  },
  computed: {
    style () {
      return this.currentComp.style
    },
    width () {
      return this.style.width + 'px'
    },
    height () {
      return this.style.height + 'px'
    },
    transform () {
      return `rotate(${this.style.transform}`
    }

  },
  watch: {
    selectedIndex: {
      immediate: true,
      handler (newValue, oldValue) {
        console.log('watch')
        this.currentComp = this.$canvas.getSelectedComp()
      }
    }
  },

  methods: {
    handleDBclick () {
      this.textareaFocused = true
    },
    handleBlur () {
      this.textareaFocused = false
    },
    handleValueChange (val) {
      const newValue = val
      // 如果改变文本高度，则调整组件框高度
      const textHeight = this.$refs.textareaRef.$refs.textarea.scrollHeight
      this.$canvas.updateSelectedComp({ height: textHeight }, newValue)
      // this.context.recordCanvasChangeHistory()
    },

    handleShowContextMenu (e) {
      e.preventDefault()
      this.showContextMenu = true
    },

    handleHideContextMenu (e) {
      this.showContextMenu = false
    },
    handleMouseDown (e) {
      console.log('edit-move')
      if (this.textareaFocused) {
        return
      }

      // 否则会触发其他组件的选中行为
      e.preventDefault()

      let startX = e.pageX
      let startY = e.pageY

      const zoom = this.zoom
      const move = (e) => {
        const x = e.pageX
        const y = e.pageY

        let disX = x - startX
        let disY = y - startY

        disX = disX * (100 / zoom)
        disY = disY * (100 / zoom)
        console.log('==', { top: disY, left: disX })
        this.$canvas.updateAssemblyComps({ top: disY, left: disX })

        startX = x
        startY = y
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        // this.context.recordCanvasChangeHistory()
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    handleContextMenu (e) {
      e.preventDefault()
      this.showContextMenu = true
    },
    submitContextMenu () {
      this.showContextMenu = false
    }
  }
}
</script>

<style lang="scss"  scoped>
.main {
position: absolute;
cursor: move;
}
.eventMask {
position: absolute;
// 防止组件太小，选不中
min-width: 20px;
min-height: 20px;
// background-color: rgba(255, 255, 255, 0.35);
background-color: rgba(200, 164, 164, 0.35);
}
.edit-textarea{
  v::deep .el-textarea__inner{
    // min-height: 40px!important;
    // padding:0;
    // line-height: 40px;
    border: none;
    height: inherit;
  }
}
</style>
