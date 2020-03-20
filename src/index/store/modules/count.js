const state = {
  count: 0
}
const mutations = {
  increment (state) {
    state.count += 1
  }
}
const actions = {
  asyncIncrement ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (getters.left > 0) {
          commit('increment')
          resolve()
        } else {
          reject(getters.left)
        }
      }, 1000)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
