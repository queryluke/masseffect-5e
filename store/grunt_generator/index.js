export default {
  namespaced: true,
  state: {
    cr: {},
    race: {},
    sc: {}
  },
  mutations: {
    update (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    setCr ({ commit }, payload) {
      commit('update', { key: 'cr', value: payload })
    },
    setRace ({ commit }, payload) {
      commit('update', { key: 'race', value: payload })
    },
    setClass ({ commit }, payload) {
      commit('update', { key: 'sc', value: payload })
    }
  },
  getters: {
    cr: state => state.cr,
    sc: state => state.sc,
    race: state => state.race
  }
}
