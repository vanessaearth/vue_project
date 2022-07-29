import router from '.'
import store from '@/store/index.js'
const whiteList = ['/login', '/'] // 白名单路由

router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  const hasToken = localStorage.getItem('token')
  if (hasToken) {
    if (to.path === '/login' || to.path === '/') {
      // 已登录，去首页
      next({ path: '/chart' })
    } else {
      const hasRoles = store.getters && store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('user/getInfo')
          clog('roles:', roles)
          // 根据当前用户角色过滤可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          clog('accessRoutes', accessRoutes)
          // 添加可访问的路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 出错需要重置token并重新登录(token过期,网络错误)
          await store.dispatch('user/resetToken')
          next(`login?redirect=${to.path}`)
          alert(error || '未知错误')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
