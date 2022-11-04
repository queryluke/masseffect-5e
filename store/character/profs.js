export const state = () => ({
})

export const getters = {
  profs: (state, getters, rootState, rootGetters) => {
    const profs = {}
    for (const type of ['skill', 'weapon', 'armor', 'tool', 'savingThrow']) {
      const matchingProfs = rootGetters['character/mechanics/mechanics'].filter(i => i.type === type)
      console.log(rootGetters['character/character'].settings)
      const customProfs = rootGetters['character/character'].settings[type] || []
      console.log(matchingProfs)
      console.log(customProfs)
      const combined = [...matchingProfs.map(i => i.value), ...customProfs]
      profs[type] = [...new Set(combined)]
    }
    return profs
  }
}

export const mutations = {
}

export const actions = {
}
