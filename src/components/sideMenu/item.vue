<!--  -->
<template>
  <ul>
    <li v-if="!model.hidden">
      <div @click="toggle">
        <svg-icon v-if="hasIcon"
                  :icon-class="model.meta.icon"></svg-icon>
        <span v-if="isFolder">
          <!-- 设置标题才显示 -->
          <span v-if="hasTitle">{{model.meta.title}}</span>
          [{{open?'-':'+'}}]
        </span>
        <template v-else>
          <router-link :to="resolvePath(model.path)">{{title}}</router-link>
        </template>
      </div>
      <ul v-show="open"
          v-if="isFolder">
        <item class="item"
              v-for="route in model.children"
              :model="route"
              :key="route.path"
              :base-path="resolvePath(model.path)">
        </item>
      </ul>
    </li>
  </ul>
</template>

<script>
import path from 'path'
export default {
  name: 'item',
  components: {},
  data () {
    return {
      open: false
    }
  },
  props: {
    model: {
      type: Object
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length > 0
    },
    hasIcon () { return this.model.meta && this.model.meta.icon },
    hasTitle () { return this.model.meta && this.model.meta.title },
    title () {
      return this.hasTitle ? this.model.meta.title : this.model.name ? this.model.name : this.model.path
    }
  },
  methods: {
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    },
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
