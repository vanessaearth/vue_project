
let Vue
class Store {
  // 持有state，并使其响应式
  // 实现commit和dispatch2个方法
  constructor (options) {
    this.state = new Vue({
      data: options.state
    })
    this.mutations = options.mutations
    this.actions = options.actions
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  // 实现commit，可以修改option的数据
  commit (type, args) {
    this.mutations[type](this.state, args)
  }
  dispatch (type, args) {
    const store = this
    this.actions[type](store, args)
  }
}
function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
