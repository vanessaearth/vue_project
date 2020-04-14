import router from '.'
import store from '../store'
const whiteList = ['/login', '/']

router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  const hasToken = localStorage.getItem('token')
  if (hasToken) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/chart' })
    } else {
      const hasRoles = store.state.user.roles && store.state.user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('user/getInfo')
          clog(roles)
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          clog(accessRoutes)
          router.addRoutes(accessRoutes)
          next({ ...to })
        } catch (error) {

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
