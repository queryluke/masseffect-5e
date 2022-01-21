import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import jsonpack from 'jsonpack/main'

export const state = () => ({
  characterIdIndex: 0,
  characters: {},
  mobileView: 'abilities',
  syncStatus: 'saved',
  currentVersion: '1.0.1'
})

export const getters = {
  characters: state => state.characters,
  mobileView: state => state.mobileView,
  syncStatus: state => state.syncStatus,
  currentVersion: state => state.currentVersion
}

export const mutations = {
  SET_SYNC_STATUS (state, value) {
    state.syncStatus = value
  },
  SET_MOBILE_VIEW (state, view) {
    state.mobileView = view
  },
  SET_CHARACTERS (state, characters) {
    state.characters = characters
  },
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
    state.characters = { ...state.characters, [cid]: character }
  },
  DELETE_CHARACTER (state, id) {
    if (state.characters[id]) {
      const characters = JSON.parse(JSON.stringify(state.characters))
      delete characters[id]
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
  async LOAD_CHARACTERS_FROM_SERVER ({ dispatch, getters, commit, rootGetters }) {
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    const unSynced = []
    for (const character of Object.values(getters.characters)) {
      if (!character.meta || character.meta.remote === false) {
        const clone = JSON.parse(JSON.stringify(character))
        clone.meta = { ...clone.meta, remote: true }
        try {
          await dispatch('api/MUTATE', { mutation: 'createCharacter', input: { userId: rootGetters['auth/sub'], data: jsonpack.pack(clone) } }, { root: true })
        } catch (e) {
          clone.meta = { ...clone.meta, remote: false }
          unSynced.push(clone)
        }
      }
    }
    let nextToken = null
    const remoteChars = []
    do {
      const response = await dispatch('api/QUERY', { query: 'characterByUser', variables: { userId: rootGetters['auth/sub'], limit: 100, nextToken } }, { root: true })
      nextToken = response.nextToken
      remoteChars.push(...response.items)
    } while (nextToken !== null)
    const loadedCharacters = {}
    for (const rChar of remoteChars) {
      const char = jsonpack.unpack(rChar.data)
      char.id = rChar.id
      loadedCharacters[rChar.id] = char
    }
    for (const urChar of unSynced) {
      loadedCharacters[urChar.id] = urChar
    }
    commit('SET_CHARACTERS', loadedCharacters)
  },
  async CREATE_CHARACTER ({ dispatch, commit, rootGetters, getters }, character) {
    if (rootGetters['auth/isAuthenticated']) {
      try {
        if (!character.meta) {
          character.meta = {
            remote: true,
            version: getters.currentVersion
          }
        }
        character.meta.remote = true
        const response = await dispatch('api/MUTATE', { mutation: 'createCharacter', input: { userId: rootGetters['auth/sub'], data: jsonpack.pack(character) } }, { root: true })
        character.id = response.id
      } catch (e) {
        character.meta.remote = false
        console.log(e)
      }
    }
    commit('UPDATE_CHARACTERS', character)
    return character.id
  },
  UPDATE_CHARACTER ({ dispatch, rootGetters, commit, getters }, payload) {
    commit('UPDATE_CHARACTER', payload)
    if (rootGetters['auth/isAuthenticated']) {
      if (getters.syncStatus !== 'syncing') {
        commit('SET_SYNC_STATUS', 'editing')
      }
      dispatch('DEBOUNCED_REMOTE_UPDATE', payload.cid)
    }
  },
  DEBOUNCED_REMOTE_UPDATE: debounce(({ dispatch }, id) => {
    dispatch('REMOTE_UPDATE', id)
  }, 10000
  ),
  async REMOTE_UPDATE ({ dispatch, commit, rootGetters, getters }, id) {
    console.log('updating on aws')
    try {
      const character = getters.characters[id]
      commit('SET_SYNC_STATUS', 'syncing')
      await dispatch('api/MUTATE', { mutation: 'updateCharacter', input: { id, userId: rootGetters['auth/sub'], data: jsonpack.pack(character) } }, { root: true })
      commit('SET_SYNC_STATUS', 'saved')
    } catch (e) {
      commit('SET_SYNC_STATUS', 'error')
      console.log(e)
    }
  },
  async REMOVE_CHARACTER ({ dispatch, commit, rootGetters }, id) {
    if (rootGetters['auth/isAuthenticated']) {
      try {
        await dispatch('api/MUTATE', { mutation: 'deleteCharacter', input: { id } }, { root: true })
      } catch (e) {
        console.log(e)
      }
    }
    commit('DELETE_CHARACTER', id)
  },
  async FETCH_CB_DATA ({ dispatch }) {
    await dispatch('FETCH_LOTS', [
      'species', 'traits', 'weapons', 'armor', 'mods', 'powers', 'feats', 'backgrounds', 'classes', 'class-features',
      'subclasses', 'character-progression', 'skills', 'gear', 'tool-profs', 'weapon-properties', 'conditions',
      'subspecies', 'subspecies-options'
    ], { root: true })
  },
  DELETE_SELECTIONS ({ dispatch, getters }, { cid, id }) {
    const newSelections = getters.characters[cid].selections.filter(i => !i.source.startsWith(id))
    dispatch('UPDATE_CHARACTER', { cid, attr: 'selections', value: newSelections })
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
  }
}
