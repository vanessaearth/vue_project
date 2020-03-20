/* 1.创建传入组件实例
 * 2.挂载他从而生成dom结构
 * 3.生成dom结构追加到body
 * 4.淘汰机制，不需要是组件实力应该背销毁
 */
import Vue from 'vue'
export default function (component, props) {
  const vm = new Vue({
    render (h) {
      return h(component, { props })
    }
  }).$mount()
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0]
  comp.remove = () => {
    // 移除dom
    document.body.removeChild(vm.$el)
    // 销毁组件
    vm.$destroy()
  }
  return comp
}
