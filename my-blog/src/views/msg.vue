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
    节流：每隔2秒发送一次请求
    <input type="text"
           @click="(k)=>remoteName(k,'campaign')">
   <div style="margin-top:30px">
     <ElButton type="primary" @click="showMsg">显示自定义弹框</ElButton>
   </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { throttle } from '@/utils/modules/throttle.js'

import { create } from '@/plugins/create.js'
import createComp from '@/components/form/notice.vue'
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
      filterOption: {
        campaignName: []
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    remoteName: throttle(function (key, type) {
      this.postRemote({ key, type })
    }, 5000),
    async postRemote ({ key, type }) {
      const res = await this.$axios.post(`/${type}/sugName`, { key: key })
      this.filterOption[type + 'Name'] = res
    },
    showMsg () {
      this.$msg({
        title: 'aha,我是title',
        message: '我是正文',
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
