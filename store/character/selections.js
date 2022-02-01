import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
})

export const getters = {
  selected: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].selected
  }
}

export const mutations = {
}

export const actions = {
  UPSERT_SELECTION ({ dispatch, getters }, payload) {
    const newSelections = cloneDeep(getters.selected)
    const index = newSelections.findIndex(i => i.path === payload.path && (payload.limit ? i.limit === payload.limit : true))
    if (index > -1) {
      newSelections.splice(index, 1, payload)
    } else {
      newSelections.push(payload)
    }
    dispatch('character/UPDATE_CHARACTER', { attr: 'selected', value: newSelections }, { root: true })
  },
  BULK_DELETE ({ dispatch, getters }, path) {
    const newSelections = getters.selected.filter(i => !i.path.startsWith(path))
    dispatch('character/UPDATE_CHARACTER', { attr: 'selected', value: newSelections }, { root: true })
  }
}
