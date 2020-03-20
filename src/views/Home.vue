<!--  -->
<template>
  <div>
    这里是首页，无需登录，想查看更多请
    <router-link :to="{path:'/login'}">登录</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data () {
    return {
      message: 'data msg'
    }
  },
  props: {},
  computed: {},
  methods: {
    changeMsg () {
      this.message = '按钮点击'
    }
  },
  watch: {},
  created () {
    this.message = 'create msg'
  },
  mounted () {
    this.message = 'mounted msg'
  },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
