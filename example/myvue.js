
// 定义对象的一个属性为响应式的
function defineReactive (obj, key, val) {
  // 如果有val又是嵌套对象，重新遍历对象值
  observer(val)
  Object.defineProperty(obj, key, {
    get () {
      console.log('get', key)
      return val
    },
    set (newVal) {
      console.log('set', key)
      if (newVal !== val) {
        newVal = val
      }
    }
  })
}
// 遍历对象让每个属性，让每个属性调用响应式的方式
function observer (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // eslint-disable-next-line no-new
  new Observer(obj)
}

class Observer {
  constructor (value) {
    this.value = value
    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value)
    }
  }
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
// 代理函数，代理￥data到vue的实例
function proxy (vm) {
  Object.keys(vm.$data).forEach(key => {
    // 为当前实例做代理。定义可以与data中key相对应
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data.key
      },
      set (newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}
// Vue,解析选项，响应式，编译
class MyVue {
  constructor (options) {
    this.$options = options
    this.$data = options.data
    observer(this.$data)
    // 调用代理
    proxy(this)
  }
}
class Compile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    this.compile(this.$el)
  }
  compild (el) {
    el.childNode.forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点，编译元素
      }
    })
  }
}
