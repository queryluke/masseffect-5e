export const state = () => ({
  cr: {},
  race: {},
  sc: {}
})

export const getters = {
  cr: state => state.cr,
  sc: state => state.sc,
  race: state => state.race
}

export const mutations = {
  update (state, payload) {
    state[payload.key] = payload.value
  }
}

export const actions = {
  setCr ({ commit }, payload) {
    commit('update', { key: 'cr', value: payload })
  },
  setRace ({ commit }, payload) {
    commit('update', { key: 'race', value: payload })
  },
  setClass ({ commit }, payload) {
    commit('update', { key: 'sc', value: payload })
  }
}
