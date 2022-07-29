<template>
  <div id="app">
    <div v-if="isShowLayout"
         :class="isShowSide ? 'show-side':''">
      <MySider></MySider>
      <div class="main">
        <MyHeader></MyHeader>
        <div class="main-container">
          <RouterView />

        </div>
      </div>
    </div>
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<script>
import MySider from '@/components/layout/mySider.vue'
import MyHeader from '@/components/layout/myHeader.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: { MySider, MyHeader },
  computed: {
    isShowLayout: function () {
      let flag = false
      if (this.$route.meta) {
        flag = !this.$route.meta.isHideLayout
      }
      return flag
    },
    ...mapGetters(['isShowSide'])
  },
  created () {
    this.$store.dispatch('user/login', { username: this.username || 'admin' })
      .then(() => {
        this.$router.push({
          path: this.$route.query.redirect || '/chart'
        })
      }).catch(err => {
        clog(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding-left: 60px;
  transition: all 0.5s;
  overflow: hidden;
}
.show-side .main {
  padding-left: $side-width;
}
.main-container {
  min-height: 600px;
  border-radius: 5px;
  margin: $gap;
}
.show-side .main.guide {
  padding: 0;
  margin: 0;
}
</style>
