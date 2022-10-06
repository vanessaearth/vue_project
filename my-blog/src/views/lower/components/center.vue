<template>
  <div
    id="center"
    @click="handleCenter"
    class="box">
    <div class="box-top">
      center
      <ElButton type="primary" @click="handleSave">save</ElButton>
    </div>
    <div
      id="canvas"
      class="box-center"
      :style="{
        ...canvasData.style,
        backgroundImage: `url(${canvasData.style.backgroundImage})`,
        transform: `scale(${zoom / 100})`,
        width: canvasData.style.width+'px',
        height: canvasData.style.height+'px'}"
      @dragenter="dragEnter"
      @dragover="dragOver"
      @drop="handleDrop">
      <template v-if="selectedIndex !== -1 ">
        <Edit :selected-index="selectedIndex" />
      </template>
      <div
        class="comps">
        <Comps
          v-for="(item,index) in canvasData.comps"
          :key="item.key"
          :comp="item"
          :index="index"
          @submit="handleSelect" />
      </div>
    </div>
  </div>
</template>

<script>
import Comps from './comp/comps'
import Edit from './comp/Edit'
export default {
  components: {
    Comps, Edit
  },
  data () {
    return {
      selectedIndex: -1,
      zoom: 100
    }
  },
  computed: {
    canvasData () {
      return this.$canvas.getCanvas()
    }

  },
  methods: {
    handleSave () {
      console.log(
        '%c [  ]-25',
        'font-size:13px; background:pink; color:#bf2c9f;',
        this.canvasData
      )
      this.$router.push({
        name: 'lowerH5',
        params: {
          data: this.canvasData
        }
      })
    },
    dragOver (e) {
      // console.log('dragOver', e)
      e.preventDefault()
    },
    dragEnter (e) {
      console.log('dragEnter', e)
      e.preventDefault()
    },
    getOnlyKey () {
      return Math.random()
    },

    handleDrop (e) {
      e.preventDefault()
      console.log('handleDrop', e.pageX, e.pageY)
      const endX = e.pageX
      const endY = e.pageY

      let dragComp = e.dataTransfer.getData('drag-Comp')

      if (!dragComp) {
        return
      }
      dragComp = JSON.parse(dragComp)

      const zoom = this.zoom
      const canvasDOMPos = {
        top: 110,
        left: document.body.clientWidth / 2 - (this.canvasData.style.width / 2) * (zoom / 100)
      }

      const startX = canvasDOMPos.left
      const startY = canvasDOMPos.top

      let disX = endX - startX
      let disY = endY - startY

      disX = disX * (100 / zoom)
      disY = disY * (100 / zoom)

      dragComp.style.left = (disX - dragComp.style.width / 2)
      dragComp.style.top = (disY - dragComp.style.height / 2)
      console.log('disX-disY', dragComp.style.left, dragComp.style.top)
      this.$canvas.addComp(dragComp)
      this.selectedIndex = this.$canvas.getCanvasComps().length - 1
    },
    handleSelect (index) {
      this.$canvas.setSelectedCompIndex(index)
      this.selectedIndex = this.$canvas.getSelectedCompIndex()
      console.log('center--当前index-comp', this.selectedIndex)
    },
    handleCenter (e) {
      if (e.target.id === 'center') {
        this.$canvas.setSelectedCompIndex(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items:center;
  flex: 1;
  text-align: center;
  flex-direction: column;
}

.box-center {
  position: relative;
  box-shadow: #ccc 1px 1px 20px;
  transform-origin: 50% 0%;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
