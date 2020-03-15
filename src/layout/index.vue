<!--  -->
<template>
  <div id="app">
    <div class="app-wrapper">
      <div class="main-container">
        <sideBar></sideBar>
        <sideMenu></sideMenu>
        <breadLow></breadLow>
        <breadcrumb></breadcrumb>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from '@/components/sideBar'
import sideMenu from '@/components/sideMenu'
import breadLow from '@/components/bread/breadLow'
import breadcrumb from '@/components/bread/breadcrumb'
export default {
  name: 'layout',
  components: { sideBar, sideMenu, breadLow, breadcrumb },
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
</style>
