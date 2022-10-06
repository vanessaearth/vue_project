<template>
  <div>
    <div class="line xLine" :style="{width, top: '-2px'}" />
    <div class="line xLine" :style="{width, top: height}" />
    <div class="line yLine" :style="{height: yHeight, top: '-2px', left: -2}" />
    <div class="line yLine" :style="{height: yHeight, top:'-2px', left: width}" />
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
      return this.styles.width
    },
    height () {
      return this.styles.height
    },
    yHeight () {
      return (parseInt(this.styles.height) + 4) + 'px'
    }
  }

}
</script>

<style lang="scss" scoped>
.line {
  z-index: 9999;
  position: absolute;
  background-color: rgba(0, 87, 255, 1); // #02dcf7;
}
.xLine {
  height: 2px;
}

.yLine {
  width: 2px;
}

</style>
