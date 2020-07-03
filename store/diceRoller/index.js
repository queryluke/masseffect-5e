export default {
  namespaced: true,
  state: {
    rolls: []
  },
  mutations: {
    addRoll (state, payload) {
      state.rolls.push(payload)
    },
    clearRolls (state) {
      state.rolls = []
    }
  },
  actions: {
    addRoll ({ commit }, payload) {
      commit('addRoll', payload)
    },
    clearRolls ({ commit }) {
      commit('clearRolls')
    }
  },
  getters: {
    rolls: state => state.rolls
  }
}
