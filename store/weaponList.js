export default {
  namespaced: true,
  state: {
    sortBy: { key: 'name', display: 'Name' },
    order: 1,
    type: [],
    rarity: []
  },
  mutations: {
    update (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    updateList ({commit}, payload) {
      commit('update', payload)
    },
    updateSearchString ({commit}, payload) {
      commit('phb/updateSearchString', payload, {root: true})
    }
  },
  getters: {
    sortBy: state => state.sortBy,
    order: state => state.order,
    type: state => state.type,
    rarity: state => state.rarity,
    searchString: (state, getters, rootState, rootStateGetters) => rootState.phb.searchString,
    weapons: (state, getters, rootState, rootStateGetters) => rootStateGetters.getData('weapons')
  }
}
