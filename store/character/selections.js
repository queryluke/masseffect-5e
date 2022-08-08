import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
})

export const getters = {
  selected: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/character'].selected
  },
  valueLookup: (state, getters) => ({ model, id, limit }) => {
    const matches = getters.selected.filter(i => i.path.includes(`${model}/${id}`)).reduce((acc, curr) => acc.concat(curr.value), [])
    if (limit) {
      return matches.filter(i => limit.includes(i.type)).map(i => i.value || i.ability)
    }
    return matches.map(i => i.value)
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
    dispatch('character/mechanics/INIT_MECHANICS', null, { root: true })
  },
  BULK_DELETE ({ dispatch, getters }, path) {
    const newSelections = getters.selected.filter(i => !i.path.startsWith(path))
    dispatch('character/UPDATE_CHARACTER', { attr: 'selected', value: newSelections }, { root: true })
  }
}
