const state = {
  count: 0,
  count2: localStorage.getItem('count')
}
const mutations = {
  increment (state, data) {
    if (data) {
      state.count += data
    } else {
      state.count += 1
    }
  },
  incrementSave (state, data) {
    if (data) {
      state.count2 += data
    } else {
      state.count2 += 1
    }
    localStorage.setItem('count', state.count2)
  }
}
const actions = {
  asyncIncrement ({ getters, commit }, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment', data)
        resolve()
      }, 1000)
    })
  },
  asyncIncrementSave ({ getters, commit }, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('incrementSave', data)
        resolve()
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
