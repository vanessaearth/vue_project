<!--  -->
<template>
  <div>
    <slot></slot>
    <div class="fs20">
      <slot name="content"
            :foo="tom"></slot>
    </div>

    <el-button type="primary"
               plain
               @click="handleEmit">emit</el-button>
  </div>
</template>

<script>
export default {
  name: 'com',
  components: {},
  data () {
    return {
      tom: ' 汤姆'
    }
  },
  props: {},
  computed: {},
  methods: {
    handleEmit () {
      clog('com11 提交emit')
      this.$bus.$emit('emitBus')
      this.$parent.$emit('handle1Btn')
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .fs20 {
    font-size: 20px;
  }
</style>
