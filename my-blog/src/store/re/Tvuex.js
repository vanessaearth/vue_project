
let Vue
class Store {
  // 持有state，并使其响应式
  // 实现commit和dispatch2个方法
  constructor (options) {
    this.state = new Vue({
      data: options.state
    })
    this._mutations = options.mutations
    this._actions = options.actions
    this._getter = options.getter
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
    // this.mapGetters = this.mapGetters.bind(this)
  }

  mapGetters (keys) {
    const data = {}
    keys.forEach(key => {
      // Object.prototype.hasOwnProperty.call(obj, 'key')

      if (Object.prototype.hasOwnProperty.call(this._getter, key)) {
        data[key] = this._getter[key]
      }
    })
    clog('mapGetters:', data)
    return data
  }

  // 实现commit，可以修改option的数据
  commit (type, args) {
    const entry = this._mutations[type]
    if (entry) {
      this._mutations[type](this.state, args)
    }
  }

  dispatch (type, args) {
    const entry = this._actions[type]
    if (entry) {
      this._actions[type](this, args)
    }
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
