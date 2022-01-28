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
    const index = newSelections.findIndex(i => i.path === payload.path)
    if (index > -1) {
      let newPayload
      if (payload.value.some(i => i.limit)) {
        const limit = payload.value[0].limit
        newPayload = { ...payload, value: [...newSelections[index].value.filter(i => i.limit !== limit), ...payload.value] }
      }
      newSelections.splice(index, 1, newPayload || payload)
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
