<!--  -->
<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
    <!-- {{form.model[prop]}}, -->
    {{form.rules[prop]}}
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'KFormItem',
  inject: ['form'],
  components: {},
  data () {
    return {
      error: ''
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  computed: {},
  methods: {
    validate () {
      // 0获取校验规划和值
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      // 1创建schema
      const schema = new Schema({
        [this.prop]: rules
      })
      // 2使用该实例执行校验
      return schema.validate({
        [this.prop]: value
      }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
  },
  destroyed () {}
}

</script>
<style lang='scss' scoped>
</style>
