import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import jsonpack from 'jsonpack/main'

function updateCharacter ({ oldValue, attr, value }) {
  const character = cloneDeep(oldValue)
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
  return character
}

export const state = () => ({
  character: null,
  id: null
})

export const getters = {
  character: (state) => {
    console.log('getting')
    return state.character
  },
  id: state => state.id,
  image: (state, getters) => getters.character.image || (getters.character.species ? getters['species/species'].bodyImg : false) || require('~/assets/images/me5e_logo_450w.png')
}

export const mutations = {
  SET_CHARACTER (state, character) {
    state.character = character
  },
  SET_CHARACTER_ID (state, value) {
    state.id = value
  }
}

export const actions = {
  async FETCH_CB_DATA ({ dispatch }) {
    await dispatch('FETCH_LOTS', [
      'species', 'traits', 'weapons', 'armor', 'mods', 'powers', 'feats', 'backgrounds', 'classes', 'class-features',
      'subclasses', 'character-progression', 'skills', 'gear', 'tool-profs', 'weapon-properties', 'conditions',
      'benefits'
    ], { root: true })
  },
  async LOAD_CHARACTER ({ dispatch, commit, rootGetters, getters }, id) {
    if (rootGetters['auth/isAuthenticated']) {
      const character = await dispatch('api/QUERY', { query: 'getCharacter', variables: { id } }, { root: true })
      // TODO: migrate on load for future versions
      commit('SET_CHARACTER', jsonpack.unpack(character.data))
      commit('SET_CHARACTER_ID', character.id)
    } else {
      console.log('loading local')
      await dispatch('local/LOAD_CHARACTER', id)
    }
    return getters.character
  },
  UPDATE_CHARACTER ({ dispatch, rootGetters, commit, getters }, { attr, value }) {
    // TODO: bulk update for things like deleting selections when classes/species change...but may not be necessary
    // as it doesn't happen often
    const newValue = updateCharacter({ oldValue: getters.character, attr, value })
    commit('SET_CHARACTER', newValue)
    if (rootGetters['auth/isAuthenticated']) {
      if (rootGetters['user/search'] !== 'syncing') {
        commit('user/SET_SYNC_STATUS', 'editing', { root: true })
      }
      dispatch('DEBOUNCED_REMOTE_UPDATE_CHARACTER')
    } else {
      dispatch('characters/UPSERT_LOCAL_CHARACTER', newValue, { root: true })
    }
  },
  DEBOUNCED_REMOTE_UPDATE_CHARACTER: debounce(({ dispatch }) => {
    dispatch('REMOTE_UPDATE_CHARACTER')
  }, 10000
  ),
  async REMOTE_UPDATE_CHARACTER ({ dispatch, commit, rootGetters, getters }) {
    try {
      commit('user/SET_SYNC_STATUS', 'syncing', { root: true })
      await dispatch('api/MUTATE', {
        mutation: 'updateCharacter',
        input: {
          id: getters.id,
          userId: rootGetters['auth/sub'],
          data: jsonpack.pack(getters.character)
        }
      }, { root: true })
      commit('SET_SYNC_STATUS', 'saved', { root: true })
    } catch (e) {
      commit('SET_SYNC_STATUS', 'error', { root: true })
      console.log(e)
    }
  }
}
