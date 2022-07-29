import Vue from 'vue'
import Vuex from './re/Tvuex'

Vue.use(Vuex)
const state = {
  token: localStorage.getItem('token'),
  user: { roles: [] }
}
const getters = {
  role: state => state.user.roles
}
const actions = {
  login ({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      Vue.axios.post('/user/login', { username: username }).then(res => {
        if (res.username === 'admin' || res.username === 'editor') {
          commit('SET_TOKEN', username)
          localStorage.setItem('token', username)
          resolve()
        } else {
          reject('用户名密码错误') //eslint-disable-line
        }
      })
    })
  },
  getUserInfo ({ commit, dispatch, state }, agent) {
    return new Promise(resolve => {
      Vue.axios.get('/user/info').then(res => {
        const roles = res.roles
        commit('SET_ROLES', roles)
        resolve(roles)
      })
    })
  }
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.user.roles = roles
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
