<template>
  <div id="app">
    <div v-if="isShowLayout"
         :class="isShowSide ? 'show-side':''">
      <mySider></mySider>
      <div class="main">
        <myHeader></myHeader>
        <div class="main-container">
          <router-view />

        </div>
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import mySider from '@/components/layout/mySider.vue'
import myHeader from '@/components/layout/myHeader.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: { mySider, myHeader },
  computed: {
    isShowLayout: function () {
      let flag = false
      if (this.$route.meta) {
        flag = !this.$route.meta.isHideLayout
      }
      return flag
    },
    ...mapGetters(['isShowSide'])
  }
}
</script>

<style lang="scss">
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
