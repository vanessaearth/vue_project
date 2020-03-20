<!--  -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TForm',
  components: {},
  provide () {
    return {
      form: this
    }
  },
  data () {
    return {
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  computed: {},
  methods: {
    validate (cb) {
      // 调用所有formItem的validate
      // 结果是promise数组
      let isTrue = true
      let isFalse = false
      const tasks = this.$children
        .filter(item => !!item.prop)
        .map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(isTrue))
        .catch(() => cb(isFalse))
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
