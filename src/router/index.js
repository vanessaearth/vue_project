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
    meta: { icon: 'chart', title: '图表', roles: ['admin', 'editor'] }
  },
  {
    name: 'createForm',
    path: '/createForm',
    component: () => import('@/views/createForm'),
    meta: { icon: 'form', title: '表单', roles: ['admin', 'editor'] }
  },
  {
    name: 'table',
    path: '/table',
    component: () => import('@/views/table'),
    meta: { icon: 'table', title: 'table', roles: ['admin', 'editor'] }
  },
  {
    name: 'control',
    path: '/control',
    component: () => import('@/views/control'),
    meta: { icon: 'permission', title: '权限控制', roles: ['admin', 'editor'] }
  },
  {
    path: '/jestDemo',
    name: 'jestDemo',
    component: () => import('@/views/jestDemo.vue'),
    meta: {
      title: 'Jest测试',
      icon: 'jest',
      roles: ['admin']
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/user.vue'),
    redirect: '/user/info',
    meta: { icon: 'user', title: '用户中心', roles: ['admin'] },
    children: [
      {
        path: 'com',
        name: 'com',
        component: () => import('@/views/user/com1.vue'),
        meta: {
          title: '组件',
          icon: 'com',
          roles: ['admin']
        }
      },
      {
        path: 'slotDemo',
        name: 'slotDemo',
        component: () => import('@/views/user/slotDemo.vue'),
        meta: {
          title: ' 插槽',
          icon: 'slot',
          roles: ['admin']
        }
      },
      {
        path: 'vuexDemo',
        name: 'vuexDemo',
        component: () => import('@/views/user/vuexDemo.vue'),
        meta: {
          title: 'vuex',
          icon: 'vuex',
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
