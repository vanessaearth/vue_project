<!--  -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TForm',
  componentName: 'TForm',
  components: {},
  provide () {
    return {
      form: this
    }
  },
  data () {
    return {
      fileds: []
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
      const isTrue = true
      const isFalse = false
      // const tasks = this.$children
      //   .filter(item => !!item.prop)
      //   .map(item => item.validate())
      const tasks = this.fileds.map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(isTrue))
        .catch(() => cb(isFalse))
    }
  },
  watch: {},
  created () {
    this.$on('el.form.addField', (field) => {
      if (field) {
        this.fileds.push(field)
      }
    })
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
