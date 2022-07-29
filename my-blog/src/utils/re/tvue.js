import Compiler from './compiler.js'
export class Tvue {
  constructor (options) {
    this.$options = options
    this.$data = options.data
    this.observe(this.$data)
    // 依赖收集
    // let watch = new Watcher(this, 'test')
    // this.test
    const compiler = new Compiler(options.el, this)
    console.log(compiler)
    // 执行一下钩子函数
    if (options.created) {
      options.created.call(this)
    }
  }

  // 遍历data中数据
  observe (data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      // 真正的响应化处理在defineReactive中
      this.objectReactive(data, key, data[key])
      // 代理data中的属性到vue实例上
      this.proxyData(key)
    })
  }

  // 设置和读取值
  objectReactive (obj, key, val) {
    this.observe(val)
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get () {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set (newVal) {
        if (newVal === val) { return }

        val = newVal
        // 通知更新
        dep.notify()
      }
    })
  }

  proxyData (key) {
    Object.defineProperty(this, key, {
      get () {
        return this.$data[key]
      },
      set (newVal) {
        this.$data[key] = newVal
      }
    })
  }
}
// Dep和data中每一个key对应起来，复制管理相关watch
class Dep {
  constructor () {
    this.deps = []
  }

  addDep (dep) {
    this.deps.push(dep)
  }

  notify () {
    this.deps.forEach(dep => dep.update())
  }
}
// watch :负责创建data中key和更新函数的映射关系
export class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    Dep.target = this // 把当前的watch实例临时附加到Dep静态属性上
    this.cb = cb
    // this.vm[this.key] // 触发依赖收集
    Dep.target = null
  }

  update () {
    this.cb.call(this.vm, this.vm[this.key])
    clog(`${this.key}属性更新了`)
  }
}
