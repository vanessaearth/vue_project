<template>
  <div v-if="!item.hidden"
       class="menu-wrapper">
    <!-- 唯一一个需要显示子菜单情况，显示为链接 -->
    <template v-if="hasOneShowingChild(item.children,item) &&
(!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <RouterLink v-if="onlyOneChild.meta"
                   :to="resolvePath(onlyOneChild.path)">
        <ElMenuItem :index="resolvePath(onlyOneChild.path)"
                      :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 函数式组件单独处理icon，title -->
          <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                :title="onlyOneChild.meta.title" />
        </ElMenuItem>
      </RouterLink>
    </template>
    <!-- 文件夹有子菜单 -->
    <ElSubmenu v-else
                ref="subMenu"
                :index="resolvePath(item.path)"
                popper-append-to-body>
      <template v-slot:title>
        <Item v-if="item.meta"
              :icon="item.meta && item.meta.icon"
              :title="item.meta.title" />
      </template>
      <SidebarItem v-for="child in item.children"
                    :key="child.path"
                    :is-nest="true"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu" />
    </ElSubmenu>
  </div>
</template>
<script>
import path from 'path'
import Item from './item'
export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 如果只有一个子菜单时设置
          this.onlyOneChild = item
          return true
        }
      })
      // 当只有一个子路由，该子路由默认显示
      if (showingChildren.length === 1) {
        return true
      }
      // 没有子路由则显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
