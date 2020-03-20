import Vue from 'vue'
import VueRouter from './KVueRouter'
import lesson1 from '../views/lesson1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lesson1',
    component: lesson1
  },
  {
    path: '/lesson2',
    name: 'lesson2',
    component: () => import(/* webpackChunkName: "lesson2" */ '../views/lesson2.vue')
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
