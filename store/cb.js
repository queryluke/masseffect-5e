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
    const character = cloneDeep(state.characters[cid].character)
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
    state.characters[cid].character = character
  },
  DELETE_CHARACTER (state, { name, cid }) {
    // if obj with matching id exists, update it. If not, insert it
    console.log({ name, cid })
    if (state.characters[cid] && state.characters[cid].character) {
      if (name === state.characters[cid].character.name) {
        delete state.characters[cid]
        return
      }
    }
    console.error('Unable to remove character with id: ' + cid)
  },
  UPDATE_CHARACTERS (state, obj) {
    // if obj with matching id exists, update it. If not, insert it
    state.characters = { ...state.characters, [obj.id]: { character: obj, order: state.characters.length } }
  },
  LOAD_CHARACTER_FROM_FILE (state, data) {
    state.character = cloneDeep(data)
  }
}

export const actions = {
  async FETCH_CB_DATA ({ dispatch }) {
    await dispatch('FETCH_LOTS', ['species', 'traits', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses', 'character-progression', 'skills', 'gear', 'tool-profs'], { root: true })
  }
}
