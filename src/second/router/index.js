import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constRoutes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: () => import('../views/second1.vue'),
    name: 'home'
  }, {
    path: '/about',
    component: () => import('../views/second2.vue'),
    name: 'about'
  }
]

export default new Router({
  base: process.env.BASE_URL,
  routes: constRoutes
})
