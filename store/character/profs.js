export const state = () => ({
})

export const getters = {
  profs: (state, getters, rootState, rootGetters) => {
    const profs = {}
    for (const type of ['skill', 'weapon', 'armor', 'tool', 'savingThrow']) {
      const matchingProfs = rootGetters['character/mechanics/mechanics'].filter(i => i.type === type)
      const customProfs = rootGetters['character/character'].settings[type] || []
      const combined = [...matchingProfs.map(i => i.value), ...customProfs]
      profs[type] = [...new Set(combined)]
    }
    return profs
  },
  equippedArmorLackingProficiency: (state, getters, rootState, rootGetters) => {
    const { numLight, numMed, numHeavy } = rootGetters['character/ac/equippedArmorBreakdown']
    const { armor } = getters.profs
    let numLacking = 0
    if (!armor.includes('light')) {
      numLacking += numLight
    }
    if (!armor.includes('medium')) {
      numLacking += numMed
    }
    if (!armor.includes('heavy')) {
      numLacking += numHeavy
    }
    return numLacking
  },
  disadvantageFromHeavierArmor: (state, getters, rootState, rootGetters) => {
    if (!rootGetters['character/character'].options?.armorProficiencyPenalty) {
      return false
    }
    return getters.equippedArmorLackingProficiency > 1
  },
  preventPowerCastingFromHeavierArmor: (state, getters, rootState, rootGetters) => {
    if (!rootGetters['character/character'].options?.armorProficiencyPenalty) {
      return false
    }
    return getters.equippedArmorLackingProficiency > 3
  }
}

export const mutations = {
}

export const actions = {
}
