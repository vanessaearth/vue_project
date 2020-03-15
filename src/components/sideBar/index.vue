<!--  -->
<template>
  <div>
    <el-menu :default-active="activeMenu"
             :background-color="variables.menuBg"
             :text-color="variables.menuText"
             :unique-opened="false"
             :active-text-color="variables.menuActiveText"
             :collapse-transition="false"
             mode="vertical">
      <sidebar-item v-for="route in permission_routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './sidebarItem'
export default {
  name: 'sidBar',
  components: { sidebarItem },
  data () {
    return {
    }
  },
  props: {},
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route // 默认激活项
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return {
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF',
        menuBg: '#304156'
      }
    }
  },
  methods: {},
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
