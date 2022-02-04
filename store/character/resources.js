import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
})

export const getters = {
  resources: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].currentStats.resources
  }
}

export const mutations = {
}

export const actions = {
  SET_RESOURCE ({ dispatch, getters }, { id, value }) {
    const newResources = cloneDeep(getters.resources)
    newResources[id] = value
    dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.resources', value: newResources }, { root: true })
  }
}
