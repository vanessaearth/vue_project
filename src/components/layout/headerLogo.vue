<!--  -->
<template>
  <div class="header-box">
    <div class="container-layout">
      <img class="logo"
           src="../../assets/img/logo.png"
           alt="">
      <div class="fs32 logo-txt">
        我的小站
      </div>

      <div class="right">
        <router-link :to="{path:'/login'}">
          <el-button type="primary">
            登录
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerLogo',
  components: {},
  data () {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .header-box {
    height: 40px;
    background: #fff;
    padding: 10px 20px;
    .logo {
      display: inline-block;
      vertical-align: top;
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    .logo-txt {
      display: inline-block;
      font-size: 24px;
      font-weight: 700;
      line-height: 40px;
      margin-left: $gap;
      vertical-align: top;
    }
    .right {
      float: right;
      padding: 6px 20px;
    }
  }
</style>
