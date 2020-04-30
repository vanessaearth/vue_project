<!--
/**
 * @name 'msg'
 * @desc ''
 * @author ''
 * @time 2020年04月30日 13:25:18 Thursday
 */
-->
<template>
  <div>
    <button @click="showMsg">显示自定义弹框</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { create } from '@/plugins/create.js'
import createComp from '@/components/create.vue'
Vue.prototype.$msg = (options) => {
  const comp = create(createComp, options)
  comp.show()
  return comp
}
export default {
  name: 'msg',
  components: {},
  data () {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {
    showMsg () {
      this.$msg({
        title: 'aha,我是title',
        msg: '我是正文',
        duration: 1000
      })
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
