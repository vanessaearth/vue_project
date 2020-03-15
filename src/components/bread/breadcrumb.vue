<!--  -->
<template>
  <div>
    <el-breadcrumb separator="/">
      <transition-group name="breadCrumb">

        <el-breadcrumb-item v-for="(item,idx) in levelList"
                            :key="item.path">
          <span v-if="item.redirect==='noRedirect'||idx==levelList.length-1"
                class="no-redirect">
            {{item.meta.title}}
          </span>
          <a v-else
             @click.prevent="handleLink(item)">{{item.meta.title}}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  name: 'breadcrumb',
  components: {},
  data () {
    return {
      levelList: null
    }
  },
  props: {},
  computed: {},
  methods: {
    getBreadcrumb () {
      // 面包屑仅显示包含meta.title且meta.breadcrumb不为false的路由
      let matched = this.$route.matched.filter(item =>
        item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
      const first = matched[0]
      if (!this.isHome(first)) {
        matched = [
          {
            path: '/',
            redirect: '/home',
            meta: {
              title: '首页'

            }
          }
        ].concat(matched)
      }
      this.levelList = matched
    },
    isHome (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },
    patchCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  },
  watch: {
    $route: {
      handler (route) {
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
  }
  .app-breadcrumb.el-breadcrumb .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }
  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }
  .breadcrumb-move {
    transition: all 0.5s;
  }
  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
