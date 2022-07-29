import Vue from 'vue'
const state = {
  token: localStorage.getItem('token'),
  roles: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
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
      // setTimeout(() => {
      //   if (username === 'admin' || username === 'editor') {
      //     commit('SET_TOKEN', username)
      //     localStorage.setItem('token', username)
      //     resolve()
      //   } else {
      //     reject('用户名密码错误') //eslint-disable-line
      //   }
      // }, 1000)
    })
  },
  getInfo ({ commit, state }) {
    return new Promise(resolve => {
      Vue.axios.get('/user/info').then(res => {
        const roles = res.roles
        commit('SET_ROLES', roles)
        resolve(roles)
      })
      // setTimeout(() => {
      //   const roles = state.token === 'admin' ? ['admin'] : ['editor']
      //   commit('SET_ROLES', roles)
      //   resolve(roles)
      // }, 1000)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
