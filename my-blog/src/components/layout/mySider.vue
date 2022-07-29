<!--  -->
<template>
  <div class="myside-box">
    <div class="logo">
      LOGO
    </div>
    <SideBar></SideBar>
    <!-- <sideMenu></sideMenu> -->
  </div>
</template>

<script>
import SideBar from '@/components/sideBar'
// import sideMenu from '@/components/sideMenu'
export default {
  name: 'mySider',
  components: { SideBar },
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
  .logo {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
  }
  .myside-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    color: #fff;
    background: #16273c;
  }
</style>
