<!--  -->
<template>
  <div class="line">
    <label class="label-box"
           v-if="label">{{label}}</label>
    <slot></slot>
    <p class="red"
       v-if="error">{{error}}</p>
    <!-- {{form.model[prop]}}, -->
    <!-- {{form.rules[prop]}} -->
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '@/mixins/emitter2.js'
export default {
  name: 'TFormItem',
  componentName: 'TFormItem',
  inject: ['form'],
  mixins: [emitter],
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
  created () { },
  mounted () {
    // 监听子组件中的事件
    this.$on('validate', () => {
      this.validate()
    })
    // 派发事件，通知TForm，新增一个tFormItem实例
    if (this.prop) {
      this.dispatch('TForm', 'el.form.addField', [this])
    }
  },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .line {
    margin-bottom: 10px;
  }
  .label-box {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 10px;
  }
  p.red {
    padding-left: 90px;
  }
</style>
