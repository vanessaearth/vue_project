import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constRoutes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: () => import('../views/home.vue'),
    name: 'home'
  }, {
    path: '/about',
    component: () => import('../views/about.vue'),
    name: 'about'
  }
]

export default new Router({
  base: process.env.BASE_URL,
  routes: constRoutes
})
