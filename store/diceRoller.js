export const state = () => ({
  rolls: []
})

export const getters = {
  rolls: state => state.rolls
}

export const mutations = {
  addRoll (state, payload) {
    state.rolls.push(payload)
  },
  clearRolls (state) {
    state.rolls = []
  }
}
export const actions = {
  addRoll ({ commit }, payload) {
    commit('addRoll', payload)
  },
  clearRolls ({ commit }) {
    commit('clearRolls')
  }
}
