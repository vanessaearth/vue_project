import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './plugins/bus'
import create from './utils/create'
import './icons/index'
import './permission.js'
import vp from './directive/permission.js'
import './plugins/element.js'

Vue.prototype.$bus = new Bus()
Vue.prototype.$create = create
Vue.config.productionTip = false
Vue.directive('permission', vp)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
