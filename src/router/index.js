import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'
Vue.use(Router)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      title: 'home',
      icon: 'qq'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: 'homeIndex',
          icon: 'qq'
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/about',
    component: layout,
    name: 'about',
    redirect: '/about/index',
    meta: { icon: 'wx', title: '用户中心' },
    children: [
      {
        path: 'index',
        name: 'aboutIndex',
        component: () => import('@/views/about.vue'),
        meta: {
          title: 'index',
          icon: 'qq',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/test.vue'),
        meta: {
          title: 'test',
          icon: 'qq',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'lesson1',
        name: 'lesson1',
        component: () => import('@/views/lesson1.vue'),
        meta: {
          title: 'lesson1',
          icon: 'qq'
        }
      },
      {
        path: 'lesson2',
        name: 'lesson2',
        component: () => import('@/views/lesson2.vue'),
        meta: {
          title: 'lesson2',
          icon: 'qq'
        }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})
