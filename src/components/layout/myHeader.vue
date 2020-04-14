<!--  -->
<template>
  <div class="header-box clearfix">
    <div class="right-info">
      <img src=""
           alt=""
           :style="{'background':randomColor}"
           class="default-img">
      <div class="name">{{user.token}}</div>
      <el-button type="text"
                 class="logout ml20 pointer"
                 @click="logout">退出</el-button>
    </div>
  </div>

</template>

<script>
import util from '@/utils/index'
import { mapState } from 'vuex'
export default {
  name: 'myHeader',
  components: {},
  data () {
    return {
    }
  },
  props: {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      // reload可以清除vuex数据
      window.location.reload()
      window.location.href = '/'
      // 使用路由方式需要清空vuex中数据
      // this.$router.push({
      //   path: '/login'
      // })
      // this.$store.dispatch('user/clearVuexData')
    }
  },
  watch: {},
  created () {
    this.randomColor = util.randomColor()
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .header-box {
    background: #fff;
  }
  .right-info {
    float: right;
    padding: 12px 20px;
    * {
      vertical-align: middle;
    }
  }
  .default-img {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
  }
  .name {
    margin-left: 10px;
    display: inline-block;
  }
</style>
