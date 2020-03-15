<!--  -->
<template>
  <div>
    <slot></slot>
    <div class="fs20">
      <slot name="content" :foo="tom" ></slot>
    </div>
    <button @click="handleEmit">emit</button>
  </div>
</template>

<script>
export default {
  name: 'lesson12',
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
      console.log('lesson11 提交emit')
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
.fs20{
  font-size: 20px;
}
</style>
