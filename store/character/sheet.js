export const state = () => ({
  mobileView: 'abilities',
  activeCharacterId: null
})

export const getters = {
  characterId: state => state.activeCharacterId,
  character: (state, getters, rootState, rootGetters) => {
    const characters = rootGetters['cb/characters']
    console.log('getting character')
    return characters[getters.characterId]
  },
  mobileView: state => state.mobileView
}

export const mutations = {
  SET_ACTIVE_CHARACTER (state, value) {
    state.activeCharacterId = value
  }
}

export const actions = {
  async setResource ({ getters, dispatch }, { id, value }) {
    await dispatch('cb/SET_RESOURCE', { cid: getters.characterId, id, value }, { root: true })
  },
  async update ({ getters, dispatch }, { attr, value }) {
    await dispatch('cb/UPDATE_CHARACTER', { cid: getters.characterId, attr, value }, { root: true })
  },
  DELETE_SELECTIONS ({ dispatch, getters }, { cid, id }) {
    const newSelections = getters.characters[cid].selections.filter(i => !i.source.startsWith(id))
    dispatch('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
  },
  // New Selection interface, adds should be done in components (maybe?)
  DELETE_SELECTED ({ dispatch, getters }, { cid, path }) {
    const newSelections = getters.characters[cid].selected.filter(i => !i.path.startsWith(path))
    dispatch('UPDATE_CHARACTER', { cid, attr: 'selected', value: newSelections })
  },
  UPDATE_SELECTIONS ({ dispatch, getters }, { cid, selection }) {
    const newSelections = JSON.parse(JSON.stringify(getters.characters[cid].selections))
    const index = newSelections.findIndex(i => i.source === selection.source)
    if (index > -1) {
      newSelections.splice(index, 1, selection)
    } else {
      newSelections.push(selection)
    }
    dispatch('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
  },
  ADD_SELECTIONS ({ dispatch, getters }, { cid, selections }) {
    const newSelections = [...getters.characters[cid].selections, ...selections]
    dispatch('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
  },
  SET_RESOURCE ({ dispatch, getters }, { cid, id, value }) {
    const newResources = { ...getters.characters[cid].currentStats.resources, [id]: value }
    dispatch('UPDATE_CHARACTER', { cid, attr: 'currentStats.resources', value: newResources })
  }
}
