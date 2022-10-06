import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './plugins/bus'
import { create } from './plugins/create'
import './router/permission.js'
import vp from './directive/permission.js'
// icon
import './icons/index'
import './plugins/axios'
import './plugins/element.js'
import './assets/scss/common.scss'
import Canvas from '@/utils/canvas'
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  require('./mock/index.js')
  window.clog = console.log // eslint-disable-line
} else {
  require('./mock/index.js')
  window.clog = () => { }
}

Vue.prototype.$bus = new Bus()
Vue.prototype.$create = create
Vue.config.productionTip = false
Vue.directive('permission', vp)

const app = new Vue({
  data () {
    return {
      canvas: new Canvas()
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$canvas = app.canvas
