class Compiler {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    // 执行编译
    this.compile(this.$el)
    // 追加
    // this.$el.appendChild(this.$el)
  }
  compile (el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        clog('编译标签' + node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        clog('插值文本' + node.textContent)
        this.compileText(node)
      }
      // 递归子元素
      this.compile(node)
    })
  }
  isElement (node) {
    return node.nodeType === 1
  }//

  // 是否是插值表达式，是文本节点
  isInter (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText (node) {
    // {{XX}}
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  // update函数，负责更新dom，同时创建watcher实例在2者之间挂钩
  update (node, exp, dir) {
    // 首次初始化
    const updaterFn = this[dir + 'Updater']
    updaterFn && updaterFn(node, this.$vm[exp])
    // 更新
    // eslint-disable-next-line no-new
    new Watcher(this.$vm, exp, function (value) {
      updaterFn && updaterFn(node, value)
    })
  }
  textUpdater (node, value) {
    node.textContent = value
  }

  compileElement (node) {
    // 获取属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // k-text
      const attrName = attr.name
      const exp = attr.value
      if (this.isDirective(attrName)) {
        // 截取指令名字
        const dir = attrName.substring(2)
        // 指令相应的更新函数
        this[dir] && this[dir](node, exp)
      } else if (this.isEvent(attrName)) {
        // 截取事件名字
        const dir = attrName.substring(1)
        this.eventHandler(node, exp, dir)
        // if (event === 'click') {
        //   this.$vm.$options.methods[exp]()
        // }
      }
    })
  }
  isDirective (attr) {
    return attr.indexOf('k-') === 0
  }
  isEvent (attr) {
    return attr.indexOf('@') === 0
  }
  text (node, exp) {
    this.update(node, exp, 'text')
  }
  html (node, exp) {
    this.update(node, exp, 'html')
  }
  htmlUpdater (node, value) {
    node.innerHTML = value
  }
  model (node, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }
  modelUpdater (node, value) {
    node.value = value
  }
  eventHandler (node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
    if (fn) {
      node.addEventListener(dir, fn.bind(this.$vm))
    }
  }
}
