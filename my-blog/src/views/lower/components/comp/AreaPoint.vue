<template>
  <div>
    <div
      class="stretchDot"
      :style="{ top: '-8px', left: '-8px', transform, cursor: 'nwse-resize'}"
      data-direction="top, left"
      @mousedown="handleMouseDown" />

    <div
      class="stretchDot"
      :style="{top: '-8px', left: (width / 2 - 8)+'px', transform,cursor: 'row-resize',}"
      data-direction="top"
      @mousedown="handleMouseDown" />

    <div
      class="stretchDot"
      :style="{ top:'-8px',left: (width - 8)+'px',transform,cursor: 'nesw-resize' }"
      data-direction="top right"
      @mousedown="handleMouseDown" />

    <div
      class="stretchDot"
      :style="{ top: (height / 2 - 8)+'px', left: (width - 8)+'px',transform, cursor: ' col-resize'}"
      data-direction="right"
      @mousedown="handleMouseDown" />

    <div
      class="stretchDot"
      :style="{
        top: (height - 8)+'px',
        left: (width - 8)+'px',
        transform,
        cursor: 'nwse-resize' }"
      data-direction="bottom right"
      @mousedown="handleMouseDown" />

    <div
      class="stretchDot"
      :style="{
        top: (height - 8)+'px',
        left: (width / 2 - 8)+'px',
        transform,
        cursor: 'row-resize'
      }"
      data-direction="bottom"
      @mousedown="handleMouseDown" />

    <div
      class="stretchDot"
      :style="{
        top: (height - 8)+'px',
        left: '-8px',
        transform,
        cursor: 'nesw-resize'}"
      data-direction="bottom left"
      @mousedown="handleMouseDown" />
    <div
      class="stretchDot"
      :style="{
        top: (height / 2 - 8)+'px',
        left: '-8px',
        transform,
        cursor: 'col-resize'
      }"
      data-direction="left"
      @mousedown="handleMouseDown" />
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      required: true
    }
  },
  computed: {
    width () {
      return parseInt(this.styles.width)
    },
    height () {
      return parseInt(this.styles.height)
    },
    transform () {
      return parseInt(this.styles.transform)
    }

  },
  methods: {
    handleMouseDown (e) {
      const direction = e.target.dataset.direction
      if (!direction) {
        return
      }
      e.stopPropagation()
      e.preventDefault()

      let startX = e.pageX
      let startY = e.pageY

      const zoom = 100
      const move = (e) => {
        const x = e.pageX
        const y = e.pageY

        let disX = x - startX
        let disY = y - startY

        disX = disX * (100 / zoom)
        disY = disY * (100 / zoom)

        // style top left width height
        const newStyle = {}
        // todo top left
        if (direction) {
          if (direction.indexOf('top') >= 0) {
            disY = 0 - disY
            newStyle.top = -disY
          }

          if (direction.indexOf('left') >= 0) {
            disX = 0 - disX
            newStyle.left = -disX
          }
        }

        Object.assign(newStyle, {
          width: disX,
          height: disY
        })

        this.$canvas.updateAssemblyComps(newStyle)

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
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 16px;
.stretchDot {
  z-index: 9999;
  position: absolute;
  width: $size;
  height: $size;
  background-color: rgba(0, 87, 255, 0.8);
  border-radius: 50%;
}

</style>
