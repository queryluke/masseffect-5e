import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import jsonpack from 'jsonpack/main'
import identString from '~/mixins/indentString'

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
  id: null,
  customBackground: {
    id: 'custom-background',
    name: 'Custom Background',
    mechanics: [],
    html: '<p>Use the character sheet settings to add any proficiencies</p>'
  }
})

export const getters = {
  character: (state) => {
    console.log('getting')
    return state.character
  },
  id: state => state.id,
  image: (state, getters) => getters.character.image || (getters.character.species ? getters['species/species'].bodyImg : false) || require('~/assets/images/me5e_logo_450w.png'),
  identString: (state, getters, rootState, rootGetters) => {
    const classes = rootGetters['character/klasses/klassesList']
    const subclasses = rootGetters['character/klasses/subklassesList']
    const species = rootGetters['character/species/speciesList']
    return identString(this.character, classes, species, subclasses).replace(/(\{\{ ordinal_levels-\d\d? }})/, (sub) => {
      const level = sub.split(' ')[1].split('-')[1]
      return this.$i18n.t(`ordinal_numbers[${level}]`)
    })
  },
  backgroundsList: (state, getters, rootState, rootGetters) => {
    const official = rootGetters.getData('backgrounds')
    const homebrew = [state.customBackground]
    return [...official, ...homebrew]
  },
  background: (state, getters) => {
    return getters.backgroundsList.find(i => i.id === getters.character.background)
  },
  backgroundMechanics: (state, getters) => {
    if (!getters.background) {
      return []
    }
    return [{
      path: `background/${getters.background.id}`,
      mechanics: getters.background.mechanics
    }]
  }
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
