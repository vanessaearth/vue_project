import Vue from 'vue'
import VueRouter from './TVueRouter'
import lesson1 from '../views/lesson1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lesson1',
    component: lesson1
  },
  {
    path: '/vuexDemo',
    name: 'vuexDemo',
    component: () => import(/* webpackChunkName: "vuexDemo" */ '../views/vuexDemo.vue')
  },
  {
    path: '/lesson3',
    name: 'lesson3',
    component: () => import(/* webpackChunkName: "lesson3" */ '../views/lesson3.vue')
  },
  {
    path: '/lesson4',
    name: 'lesson4',
    component: () => import(/* webpackChunkName: "lesson4" */ '../views/lesson4.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
