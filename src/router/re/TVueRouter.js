// 声明插件，vue插件需要实现一个install静态方法
let Vue
class KVueRouter {
  constructor (options) {
    this.$options = options
    this.routeMap = {} // {'index':{component:Index,...}}
    // 当前url需要时相应式
    this.app = new Vue({
      data: { current: window.location.hash.slice(1) || '/' }
    })
  }
  init () {
    // 监听事件
    this.bindEvents()
    // 解析routes
    this.createRouteMap()
    // 声明组件
    this.initComponent()
  }
  bindEvents () {
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange () {
    clog(window.location.hash)
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap () {
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }
  initComponent () {
    // 转化目标<a href='/'>XXX</a>
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        // 使用createElement函数
        // h(tag,data,children)
        // return h('a', {
        //   attrs: { href: '#' + this.to }
        // }, [this.$slots.default])
        // 使用JSX
        return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    })
    Vue.component('router-view', {
      render: (h) => {
        const comp = this.routeMap[this.app.current].component
        return h(comp)
      }
    })
  }
}
KVueRouter.install = function (_Vue) {
  Vue = _Vue
  // 实现一个混入，install时候App组件还没创建
  Vue.mixin({
    beforeCreate () {
      // 获取到vueROuter的实例并挂载在vue.prototype
      if (this.$options.router) {
        // 只会在根组件beforeCreate时候执行一次
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}
export default KVueRouter
// use 执行实例的install
