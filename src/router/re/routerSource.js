//路由插件
//1.实现一个VueRouter类
//2.实现2个全局组件router-link,router-view
class VueRouter {
  //1.监听url的变化,渲染想应组件
  constructor(options) {
    this.$options = options
    //定义一个响应式的值current
    Vue.util.defineReactive(this, 'current', '')

    this.routerMap = {}
    this.$options.routes.forEach(v => {
      this.routerMap[v.path] = v
    })

    window.addEventListener('hashCHange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.current = window.location.hash.slice(1)
  }

}
//插件需要实现install方法
//接收一个参数，Vue的构造函数，主要用于数据响应式
VueRouter.install = function (_Vue) {
  Vue = _Vue
  //使用混入做router的挂在，在new Vue()之前use(router)这个组件，所以找不到这个组件，需用mixin
  Vue.mixin({
    beforeCreate() {
      //只有new Vue({})中options有router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  //实现2个全局组件，link和view
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      },
      render(h) {
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
        //jsx的方式，环境需支持jsx，有编译器，我们看到的都是运行时环境
        return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    }
  })
  Vue.component('router-view', {
    render(h) {
      console.log('render:', this.$options.current)
      let comp = null
      const { routerMap, current } = this.$router
      if (routerMap[current]) {
        comp = routerMap[currnet].component
      }
      let comp = routerMap[this.current].component
      return h(comp)
    }

  })
}
export default VueRouter