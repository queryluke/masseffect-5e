export default {
  namespaced: true,
  state: {
    rules: {
      general: [
        'galaxy-master',
        'distance',
        'lifting-and-carrying',
        'encumbrance',
        'race-class-restrictions',
        'creature-types',
        'infrared-vision',
        'paragon-and-renegade',
        'sexy-level'
      ]
    },
    current: ''
  },
  mutations: {
    update (state, payload) {
      state.current = payload.value
    }
  },
  actions: {
    updateRuleSet ({commit}, payload) {
      commit('update', payload)
    }
  },
  getters: {
    rules: state => state.rules,
    current: state => state.current
  }
}
