const state = {
  isShowSide: true
}
const mutations = {
  SET_SIDE: (state, data) => {
    state.isShowSide = data
  }
}
const actions = {
  toggleSide ({ commit }, data) {
    commit('SET_TOKEN', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
