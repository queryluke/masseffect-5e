import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  characterIdIndex: 0,
  characters: {}
})

export const getters = {
  characters: state => state.characters,
  getCharacterHealth: state => (cid) => {
    const c = state.characters[cid].character
    const health = {
      hitPointsMax: 0
    }
    for (const cls of c.classes) {
      for (const hp of cls.hitPoints) {
        health.hitPointsMax += hp
      }
    }
    health.hitPointsLost = c.currentStats.hitPointsLost
    health.temporaryHitPoints = c.currentStats.temporaryHitPoints
    health.deathSaves = c.currentStats.deathSaves
    health.shields = c.currentStats.shields
    health.barrier = c.currentStats.barrier
    return health
  }
}

export const mutations = {
  UPDATE_CHARACTER (state, { cid, attr, value }) {
    if (!state.characters[cid]) {
      console.error('Unable to assign values to selected character. Please make sure the character id is set in the state and is defined')
      return
    }
    const character = cloneDeep(state.characters[cid])
    if (typeof attr === 'string' && attr.includes('.')) {
      let schema = character // a moving reference to internal objects within obj
      const pList = attr.split('.')
      const len = pList.length
      for (let i = 0; i < len - 1; i++) {
        const elem = pList[i]
        if (!schema[elem]) {
          schema[elem] = {}
        }
        schema = schema[elem]
      }
      schema[pList[len - 1]] = value
    } else {
      character[attr] = value
    }
    character.changedAt = new Date().getTime()
    state.characters = { ...state.characters, [cid]: character }
  },
  DELETE_CHARACTER (state, { name, cid }) {
    if (state.characters[cid]) {
      const characters = JSON.parse(JSON.stringify(state.characters))
      delete characters[cid]
      state.characters = characters
    }
  },
  UPDATE_CHARACTERS (state, obj) {
    // if obj with matching id exists, update it. If not, insert it
    state.characters = { ...state.characters, [obj.id]: obj }
  },
  LOAD_CHARACTER_FROM_FILE (state, data) {
    state.character = cloneDeep(data)
  }
}

export const actions = {
  async FETCH_CB_DATA ({ dispatch }) {
    await dispatch('FETCH_LOTS', ['species', 'traits', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses', 'character-progression', 'skills', 'gear', 'tool-profs'], { root: true })
  },
  DELETE_SELECTIONS ({ commit, getters }, { cid, id }) {
    const newSelections = getters.characters[cid].selections.filter(i => !i.source.startsWith(id))
    commit('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
  },
  UPDATE_SELECTIONS ({ commit, getters }, { cid, selection }) {
    const newSelections = JSON.parse(JSON.stringify(getters.characters[cid].selections))
    const index = newSelections.findIndex(i => i.source === selection.source)
    if (index > -1) {
      newSelections.splice(index, 1, selection)
    } else {
      newSelections.push(selection)
    }
    commit('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
  },
  ADD_SELECTIONS ({ commit, getters }, { cid, selections }) {
    const newSelections = [...getters.characters[cid].selections, ...selections]
    commit('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
  }
}
