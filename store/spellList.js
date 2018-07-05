export default {
  namespaced: true,
  state: {
    sortBy: { key: 'name', display: 'Name' },
    order: 1,
    type: [],
    availableClasses: []
  },
  mutations: {
    update (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    updateSpellList ({commit}, payload) {
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
    availableClasses: state => state.availableClasses,
    searchString: (state, getters, rootState, rootStateGetters) => rootState.phb.searchString,
    spells: (state, getters, rootState, rootStateGetters) => rootStateGetters.getData('spells')
  }
}