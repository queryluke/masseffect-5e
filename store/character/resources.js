import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
})

export const getters = {
  resources: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].currentStats.resources
  },
  toggles: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].currentStats.toggles || {}
  }
}

export const mutations = {
}

export const actions = {
  SET_RESOURCE ({ dispatch, getters }, { id, value }) {
    const newResources = cloneDeep(getters.resources)
    newResources[id] = value
    dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.resources', value: newResources }, { root: true })
  },
  SET_TOGGLE ({ dispatch, getters }, { id, value }) {
    const newToggles = cloneDeep(getters.toggles)
    newToggles[id] = value
    dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.toggles', value: newToggles }, { root: true })
  }
}
