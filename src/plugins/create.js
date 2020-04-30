import Vue from 'vue'
export function create (Component, props) {
  let Ctor = Vue.extend(Component)
  let ctor = new Ctor({ propsData: props })
  let vm = ctor.$mount()
  // 收到追加到dom
  document.body.appendChild(vm.$el)
  // 组件实例
  console.log('ctor----', ctor)
  // 淘汰机制，定时删除dom
  ctor.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  // 返回组件实例
  return ctor
}
