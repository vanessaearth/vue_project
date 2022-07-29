<!--  -->
<template>
  <div>
    <HeaderLogo></HeaderLogo>
    <div class="container-layout add-box layout">
      <div class="fs32">
        login

      </div>
      <div class="gap">

        <ElInput type="text"
                  class="short-input"
                  v-model="username" />
        <div class="gap">
          <ElButton type="primary"
                     @click="login">登录</ElButton>
        </div>
        <div class="tip gap">
          可以尝试使用admin或者editor这2个用户名登录，会分不同权限
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import HeaderLogo from '@/components/layout/headerLogo'
export default {
  name: 'login',
  components: { HeaderLogo },
  data () {
    return {
      username: 'admin'
    }
  },
  props: {},
  computed: {},
  methods: {
    login () {
      this.$store.dispatch('user/login', { username: this.username })
        .then(() => {
          this.$router.push({
            path: this.$route.query.redirect || '/chart'
          })
        }).catch(err => {
          clog(err)
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
  .add-box {
    text-align: center;
    padding-top: 100px;
    min-height: 600px;
  }
</style>
