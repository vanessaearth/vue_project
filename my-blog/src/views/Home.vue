<!--  -->
<template>
  <div>

    <HeaderLogo></HeaderLogo>
    <div class="container-layout add-box layout">
      <div class="fs32">
        <SvgIcon icon-class="chart"></SvgIcon>欢迎来到我的个人站
      </div>
      <div>
        这里是首页，无需登录，想查看更多,请试试登录吧
      </div>
      <div class="label-box">
        <ElButton v-for="(item,idx) in labelData"
                   :type="idx%3==0?'primary':idx%2==0?'success':idx%5==0?'warning':'danger'"
                   :size="idx%5==0?'':idx%3==0?'medium':idx%2==0?'small':'mini'"
                   :key="item"
                   plain>{{item}}</ElButton>
      </div>
    </div>
  <input type="text" v-model="uname"/>
    <input type="text" v-model="pwd"/>
    <ElButton @click="click">click</ElButton>
  </div>
</template>

<script>
import HeaderLogo from '@/components/layout/headerLogo'
export default {
  name: 'home',
  components: { HeaderLogo },
  data () {
    return {
      uname: '',
      pwd: '',
      message: 'data msg',
      labelData: [
        'Vue',
        'webpack',
        'h5',
        'css3',
        'js',
        'scss/less',
        'vuex',
        'vue-router',
        'nodejs/koa',
        'APP内嵌H5',
        'MySQL',
        'git',
        'echarts数据可视化',
        'php',
        '预渲染',
        '微信小程序',
        'element-ui/antDesignVue']
    }
  },
  props: {},
  computed: {},
  methods: {
    changeMsg () {
      this.message = '按钮点击'
    },
    async click () {
      const res = await this.$axios.post('/api/accounts/signup', { username: this.uname, password: this.pwd })
      if (res) {
        this.filterOptions.channel = res
      }
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
.label-box {
  width: 400px;
  height: 300px;
  margin: 200px auto 50px auto;
  border-radius: 50%;
  position: relative;
  button {
    &:nth-child(1) {
      position: absolute;
      top: -50px;
      left: 20px;
    }
    &:nth-child(2) {
      position: absolute;
      top: -100px;
      left: 80px;
    }
    &:nth-child(3) {
      position: absolute;
      top: -90px;
      left: 200px;
    }
    &:nth-child(4) {
      position: absolute;
      top: -60px;
      left: 280px;
    }
    &:nth-child(5) {
      position: absolute;
      top: 0px;
      left: -30px;
    }
    &:nth-child(6) {
      position: absolute;
      top: -22px;
      left: 80px;
    }
    &:nth-child(7) {
      position: absolute;
      top: -42px;
      left: 165px;
    }
    &:nth-child(8) {
      position: absolute;
      top: 0px;
      left: 230px;
    }
    &:nth-child(9) {
      position: absolute;
      top: -10px;
      left: 360px;
    }
    &:nth-child(10) {
      position: absolute;
      top: 35px;
      left: 0;
    }
    &:nth-child(11) {
      position: absolute;
      top: 40px;
      left: 120px;
    }
    &:nth-child(12) {
      position: absolute;
      top: 50px;
      left: 240px;
    }
    &:nth-child(13) {
      position: absolute;
      top: 45px;
      left: 320px;
    }
    &:nth-child(14) {
      position: absolute;
      top: 88px;
      left: 20px;
    }
    &:nth-child(15) {
      position: absolute;
      top: 115px;
      left: 90px;
    }
    &:nth-child(16) {
      position: absolute;
      top: 95px;
      left: 180px;
    }
    &:nth-child(17) {
      position: absolute;
      top: 85px;
      left: 300px;
    }
  }
}
</style>
