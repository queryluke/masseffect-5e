export default {
  namespaced: true,
  state: {
    sortBy: { key: 'name', display: 'Name' },
    order: 1,
    searchString: '',
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
    }
  },
  getters: {
    sortBy: state => state.sortBy,
    order: state => state.order,
    type: state => state.type,
    availableClasses: state => state.availableClasses
  }
}
