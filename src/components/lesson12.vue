<!--  -->
<template>
  <div>
    {{foo}}
  </div>
</template>

<script>
export default {
  name: 'lesson12',
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
      console.log('$bus on emitBus')
    })
    this.$parent.$on('handle1Btn', () => {
      console.log('lesson22 监听on')
      this.foo = '更新了'
    })
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
