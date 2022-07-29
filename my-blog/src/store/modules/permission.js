import { asyncRoutes, constRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constRoutes.concat(routes)
  }
}
const actions = {
  async generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
      return accessRoutes
    })
  }
}
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    // 复制一份路由，保证切换用户后，路由是最新的
    const tmp = { ...route }
    // 拥有访问权限
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 路由定义中没有roles选项，不需要权限也可访问
    return true
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
