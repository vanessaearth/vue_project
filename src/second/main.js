
import '@/assets/scss/common.scss'
import Vue from 'vue'
import '../plugins/axios'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  window.clog = window.console.log
} else {
  window.clog = () => { }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
