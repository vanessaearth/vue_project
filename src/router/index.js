import Vue from 'vue'
import Router from 'vue-router'
// import layout from '@/layout'
Vue.use(Router)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    hidden: true,
    meta: {
      isHideLayout: true
    }
  },
  {
    hidden: true,
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      isHideLayout: true
    }
  }
]

export const asyncRoutes = [
  {
    name: 'chart',
    path: '/chart',
    component: () => import('@/views/chart'),
    meta: { icon: 'wx', title: '图表', roles: ['admin', 'editor'] }
  },
  {
    name: 'createForm',
    path: '/createForm',
    component: () => import('@/views/createForm'),
    meta: { icon: 'wx', title: '表单', roles: ['admin', 'editor'] }
  },
  {
    name: 'table',
    path: '/table',
    component: () => import('@/views/table'),
    meta: { icon: 'wx', title: 'table', roles: ['admin', 'editor'] }
  },
  {
    name: 'control',
    path: '/control',
    component: () => import('@/views/control'),
    meta: { icon: 'wx', title: '权限控制', roles: ['admin', 'editor'] }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/user.vue'),
    redirect: '/user/info',
    meta: { icon: 'wx', title: '用户中心', roles: ['admin'] },
    children: [
      {
        path: 'lesson1',
        name: 'lesson1',
        component: () => import('@/views/user/lesson1.vue'),
        meta: {
          title: 'lesson1',
          icon: 'qq',
          roles: ['admin']
        }
      },
      {
        path: 'lesson2',
        name: 'lesson2',
        component: () => import('@/views/user/lesson2.vue'),
        meta: {
          title: 'lesson2',
          icon: 'qq',
          roles: ['admin']
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})
