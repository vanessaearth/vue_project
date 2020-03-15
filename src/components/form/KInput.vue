<!--  -->
<template>
  <div>
    <input  :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  name: 'KInput',
  inheritAttrs: false,
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
      this.$parent.$emit('validate')
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {}
}

</script>
<style lang='scss' scoped>
</style>
