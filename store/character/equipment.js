export const state = () => ({
})

export const getters = {
  equipment: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].equipment
  },
  armor: (state, getters) => {
    // TODO, only hydrate with main model here, splatting overrides
    return getters.equipment.filter(i => i.type === 'armor' && i.equipped)
  }
}

export const mutations = {
}

export const actions = {
}
