<template>
  <ul class="main" :style="{styles}">
    <li class="item" @click="handleCopy">
      复制组件
    </li>
    <li class="item" @click="handleDelete">
      删除组件
    </li>
    <template v-if="!hasAssembly">
      <li class="item" @click="handleMoveUp">
        上移一层
      </li>
      <li class="item" @click="handleMoveDown">
        下移一层
      </li>
      <li class="item" @click="handleMoveTop">
        置顶
      </li>
      <li class="item" @click="handleMoveBottom">
        置底
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hasAssembly: this.$canvas.hasAssembly()
    }
  },

  methods: {
    handleCopy (e) {
      e.stopPropagation()
      this.$canvas.addAssemblyCms()
      this.$emit('submit')
    },
    handleDelete (e) {
      e.stopPropagation()
      this.$canvas.deleteComps()
      this.$emit('submit')
    },
    handleMoveUp (e) {
      e.stopPropagation()
      this.$canvas.addCompZIndex()
      this.$emit('submit')
    },
    handleMoveDown (e) {
      e.stopPropagation()
      this.$canvas.subCompZIndex()
      this.$emit('submit')
    },
    handleMoveTop (e) {
      e.stopPropagation()
      this.$canvas.topZIndex()
      this.$emit('submit')
    },
    handleMoveBottom (e) {
      e.stopPropagation()
      this.$canvas.bottomZIndex()
      this.$emit('submit')
    }
  }

}
</script>

<style lang="scss" scoped>
    $size: 24px;

  .main {
  z-index: 999999;
  position: absolute;
  max-height: 410px;
  overflow: scroll;
  // border: solid 1px wheat;
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
  background: hsla(0, 0%, 100%, 0.94);
  border-radius: 4px;
  text-align: left;
  min-width: 80px;
  font-size: 12px;
  transform-origin: 50% 0;
  opacity: 0.9;
  color: gray;
  .close {
    float: right;
    width: $size;
    height: $size;
    text-align: center;
    line-height: $size;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #0057ff;
      color: #fff;
    }
  }
  .item {
    line-height: 30px;
    padding: 10px 4px;
    background-color: white;
    cursor: default;
    &:hover {
      background-color: #0057ff;
      color: #fff;
      cursor: pointer;
    }
    border-bottom: 1px solid #e4e9ee;
  }
  .desc {
    font-weight: bold;
  }

  .thumbnail {
    overflow: hidden;
    text-align: center;
  }
}

</style>
