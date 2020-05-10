import Vue from 'vue'
import Router from 'vue-router'
// import layout from '@/layout'
Vue.use(Router)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'@/views/login.vue'),
    hidden: true,
    meta: {
      isHideLayout: true
    }
  },
  {
    hidden: true,
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'@/views/home.vue'),
    meta: {
      isHideLayout: true
    }
  }
]

export const asyncRoutes = [
  {
    name: 'msg',
    path: '/msg',
    component: () => import(/* webpackChunkName: "msg" */'@/views/msg'),
    meta: { icon: 'file', title: '自定义弹窗插件', roles: ['admin', 'editor'] }
  },
  {
    name: 'form',
    path: '/form',
    component: () => import(/* webpackChunkName: "formIndex" */'@/views/formIndex'),
    meta: {
      icon: '', title: '自定义form', roles: ['admin', 'editor']
    }
  },
  {
    name: 'fileUpload',
    path: '/fileUpload',
    component: () => import(/* webpackChunkName: "fileUpload" */'@/views/fileUpload')
    // meta: { icon: 'file', title: '文件上传', roles: ['admin', 'editor'] }
  }, {
    //   name: '/userList',
    //   path: '/userList',
    //   component: () => import(/* webpackChunkName: "chart" */'@/views/userList'),
    //   meta: { icon: 'chart', title: 'userList', roles: ['admin', 'editor'] }
    // },
    name: 'chart',
    path: '/chart',
    component: () => import(/* webpackChunkName: "chart" */'@/views/chart'),
    meta: { icon: 'chart', title: '图表', roles: ['admin', 'editor'] }
  },
  // {
  //   name: 'createForm',
  //   path: '/createForm',
  //   component: () => import(/* webpackChunkName: "createForm" */'@/views/createForm'),
  //   meta: { icon: 'form', title: '表单', roles: ['admin', 'editor'] }
  // },
  {
    name: 'table',
    path: '/table',
    component: () => import(/* webpackChunkName: "table" */'@/views/table'),
    meta: { icon: 'table', title: 'table', roles: ['admin', 'editor'] }
  },
  {
    name: 'control',
    path: '/control',
    component: () => import(/* webpackChunkName: "control" */'@/views/control'),
    meta: { icon: 'permission', title: '权限控制', roles: ['admin', 'editor'] }
  },
  {
    path: '/jestDemo',
    name: 'jestDemo',
    component: () => import(/* webpackChunkName: "jestDemo" */'@/views/jestDemo.vue'),
    meta: {
      title: 'Jest测试',
      icon: 'jest',
      roles: ['admin']
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */'@/views/user/user.vue'),
    redirect: '/user/info',
    meta: { icon: 'user', title: '用户中心', roles: ['admin'] },
    children: [
      {
        path: 'com',
        name: 'com',
        component: () => import(/* webpackChunkName: "com1" */'@/views/user/com1.vue'),
        meta: {
          title: '组件',
          icon: 'com',
          roles: ['admin']
        }
      },
      {
        path: 'slotDemo',
        name: 'slotDemo',
        component: () => import(/* webpackChunkName: "slotDemo" */'@/views/user/slotDemo.vue'),
        meta: {
          title: ' 插槽',
          icon: 'slot',
          roles: ['admin']
        }
      },
      {
        path: 'vuexDemo',
        name: 'vuexDemo',
        component: () => import(/* webpackChunkName: "vuexDemo" */'@/views/user/vuexDemo.vue'),
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
