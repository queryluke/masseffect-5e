export const state = () => ({
  localCharacterIndex: null
})

export const getters = {
  localCharacterIndex: state => state.localCharacterIndex
}

export const mutations = {
  SET_LOCAL_CHARACTER_INDEX (state, value) {
    state.localCharacterIndex = value
  }
}

export const actions = {
  LOAD_CHARACTER ({ rootGetters, commit }, id) {
    const index = rootGetters['characters/characters'].findIndex(i => i.id.toString() === id.toString())
    if (index > -1) {
      commit('SET_LOCAL_CHARACTER_INDEX', index)
      commit('character/SET_CHARACTER', rootGetters['characters/characters'][index], { root: true })
    }
  }
}
