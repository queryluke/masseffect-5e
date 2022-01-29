export const state = () => ({
})

export const getters = {
  profs: (state, getters, rootState, rootGetters) => {
    const profs = {}
    for (const type of ['skill', 'weapon', 'armor', 'tool']) {
      const matchingProfs = rootGetters['character/mechanics/mechanics'].filter(i => i.type === type)
      profs[type] = [...new Set(matchingProfs.map(i => i.value))]
    }
    return profs
  }
}

export const mutations = {
}

export const actions = {
}
