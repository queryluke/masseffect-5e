export const state = () => ({
})

export const getters = {
  profs: (state, getters, rootState, rootGetters) => {
    const profs = {}
    for (const type of ['skill', 'weapon', 'armor', 'tool']) {
      profs[type] = rootGetters['character/mechanics/mechanics'].filter(i => i.type === type)
    }
    return profs
  }
}

export const mutations = {
}

export const actions = {
}
