<!--  -->
<template>
  <div class="add-box">
    <h2>login</h2>
    <div>
      <input type="text"
             v-model="username">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
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
            path: this.$route.query.redirect || '/index'
          })
        }).catch(err => {
          console.log(err)
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
