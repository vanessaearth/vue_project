
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
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
// 新加入的属性，需要重新定义响应式
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
// function update () {
//   app.innerText = app.foo
// }
let obj = { a: 1, b: 2, c: { d: 4 } }
//
// defineReactive(obj, 'foo', 'foo')
observer(obj)
// 新属性需要重新定义响应式
set(obj, 'foo', 'foo')
// obj.foo

// obj.c.f = 'd'
// defineProperty不支持数组，数组实现拦截数组变化的7个方法，
// push pop unshift shift splice sort reverse
