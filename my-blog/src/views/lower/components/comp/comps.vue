<template>
  <div
    :id="comp.key"
    class="main"
    @click="handleClick"
    :style="{...style,
             transform,
             zIndex:index,
             fontSize:style.fontSize+'px',
             borderWidth:style.borderWidth+'px',
             top:style.top+'px',
             left:style.left+'px',
             width:style.width+'px',
             height:style.height+'px'}">
    <div v-if="belongingToAssembly">
      <AreaLine
        :styles="{width:style.width+'px',
                  height:style.height+'px',
                  transform}" />
    </div>
    <div
      class="comp"
      :style="{width:style.width+'px', height:style.height+'px'}">
      <template v-if="comp.type===1">{{ comp.value }}</template>
    </div>
  </div>
</template>

<script>
import AreaLine from './AreaLine.vue'
export default {
  components: {
    AreaLine
  },
  props: {
    comp: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    belongingToAssembly () {
      return this.$canvas.belongingToAssembly(this.index)
    },
    style () {
      return this.comp.style
    },
    transform () {
      return `rotate(${this.style.transform}deg)`
    }
  },
  methods: {
    handleClick (e) {
      if (e.metaKey) {
      // 把选中的组件填入组件集合
        this.$canvas.addAndUpdateAssembly(this.index)
      } else {
        this.$canvas.setSelectedCompIndex(this.index)
      }
      this.$emit('submit', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: absolute;

  img {
    width: 100%;
    height: 100%;
  }

  .comp {
    white-space: break-spaces;
    overflow: hidden;
    padding: 5px 15px;
  }
}

</style>
