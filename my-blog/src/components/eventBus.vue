<!--  -->
<template>
  <div>
    这个是eventBus
    {{foo}}
  </div>
</template>

<script>
export default {
  name: 'eventBus',
  components: {},
  data () {
    return {
      foo: ''
    }
  },
  props: {},
  computed: {},
  methods: {
    onHandle () {

    }
  },
  watch: {},
  created () {
    this.$bus.$on('emitBus', () => {
      clog('$bus on emitBus')
    })
    this.$parent.$on('handle1Btn', () => {
      clog('eventBus 监听on')
      this.foo = '更新了'
    })
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
