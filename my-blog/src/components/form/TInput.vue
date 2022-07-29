<!--  -->
<template>
  <div class="input-box">
    <input :type="type"
           :value="value"
           @input="onInput"
           v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '@/mixins/emitter2.js'
export default {
  name: 'TInput',
  inheritAttrs: false,
  mixins: [emitter],
  components: {},
  data () {
    return {
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {},
  methods: {
    onInput (e) {
      // 转发input事件
      this.$emit('input', e.target.value)
      // 通知校验
      // this.$parent.$emit('validate')
      this.dispatch('TFormItem', 'validate')
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .input-box {
    display: inline-block;
  }
</style>
