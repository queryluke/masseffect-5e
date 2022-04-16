import cloneDeep from 'lodash/cloneDeep'
import jsonpack from 'jsonpack/main'
import { characterTemplate } from '~/mixins/character/template'

export const state = () => ({
  localCharacters: [],
  remoteCharacters: [],
  localLogs: {}
})

export const getters = {
  characters: state => [...state.remoteCharacters, ...state.localCharacters],
  remoteCharacters: state => state.remoteCharacters,
  localCharacters: state => state.localCharacters,
  localLogs: state => state.localLogs
}

export const mutations = {
  SET_LOCAL_CHARACTERS (state, characters) {
    state.localCharacters = characters
  },
  SET_REMOTE_CHARACTERS (state, characters) {
    state.remoteCharacters = characters
  },
  SET_LOCAL_LOGS (state, logs) {
    state.localLogs = logs
  }
}

export const actions = {
  async FETCH_CHARACTERS ({ dispatch, commit, rootGetters }) {
    // if not authenticated, do nothing
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    // get the aws characters
    const nextToken = null
    const response = await dispatch('api/QUERY', { query: 'characterByUser', variables: { owner: rootGetters['auth/username'], limit: 100, nextToken } }, { root: true })
    const characters = response.items.map((i) => {
      const data = jsonpack.unpack(i.data)
      data.id = i.id
      return data
    })
    commit('SET_REMOTE_CHARACTERS', characters)
    await dispatch('SYNC_LOCAL_CHARACTERS_TO_REMOTE')
  },
  async SYNC_LOCAL_CHARACTERS_TO_REMOTE ({ dispatch, getters, rootGetters }) {
    // if not authenticated, do nothing
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    const remoteCharacterIds = getters.remoteCharacters.map(i => i.id)
    const maxCharacters = rootGetters['user/maxCharacters']
    for (const [index, character] of getters.localCharacters.entries()) {
      // if the ids match, use the freshest version (remote)
      // or if adding a new remote takes them over the max
      if (remoteCharacterIds.includes(character.id) || (remoteCharacterIds.length + index + 1 > maxCharacters)) {
        continue
      }
      try {
        await dispatch('CREATE_CHARACTER', character)
        await dispatch('DELETE_LOCAL_CHARACTER', character.id)
      } catch (e) {
        console.error(`Could not create character, ${e.message}`)
      }
    }
  },
  async NEW_CHARACTER ({ dispatch, rootState }) {
    const character = cloneDeep(characterTemplate)
    character.meta.version = rootState.cbVersion
    return await dispatch('CREATE_CHARACTER', character)
  },
  async CREATE_CHARACTER ({ dispatch, commit, rootGetters, getters, rootState }, c) {
    let character = c
    // check version (via uploading)
    if (character.meta?.version !== rootState.cbVersion) {
      character = await dispatch('character/migrator/migrate', character, { root: true })
    }
    // make sure character is real
    if (!character) {
      return
    }
    if (rootGetters['auth/isAuthenticated'] && getters.remoteCharacters.length < rootGetters['user/maxCharacters']) {
      try {
        character = await dispatch('CREATE_REMOTE_CHARACTER', character)
        commit('SET_REMOTE_CHARACTERS', [...getters.remoteCharacters, character])
        return character.id
      } catch (e) {
        console.error(e)
        return dispatch('UPSERT_LOCAL_CHARACTER', character)
      }
    } else {
      return dispatch('UPSERT_LOCAL_CHARACTER', character)
    }
  },
  UPSERT_LOCAL_CHARACTER ({ commit, getters }, character) {
    if (!character.id) {
      character.id = new Date().getTime()
    }
    const characters = getters.localCharacters.slice()
    const existingIndex = characters.findIndex(i => i.id === character.id)
    if (existingIndex > -1) {
      characters.splice(existingIndex, 1, character)
    } else {
      characters.push(character)
    }
    commit('SET_LOCAL_CHARACTERS', characters)
    return character.id
  },
  async CREATE_REMOTE_CHARACTER ({ dispatch, rootGetters }, character) {
    const clone = cloneDeep(character)
    delete clone.id
    clone.meta.remote = true
    const response = await dispatch('api/MUTATE', { mutation: 'createCharacter', input: { owner: rootGetters['auth/username'], data: jsonpack.pack(clone) } }, { root: true })
    clone.id = response.id
    return clone
  },
  DELETE_LOCAL_CHARACTER ({ commit, getters }, id) {
    const index = getters.localCharacters.findIndex(i => i.id === id)
    if (index > -1) {
      const newCharacters = getters.localCharacters.slice()
      newCharacters.splice(index, 1)
      commit('SET_LOCAL_CHARACTERS', newCharacters)
    }
  },
  async DELETE_REMOTE_CHARACTER ({ commit, dispatch, getters, rootGetters }, id) {
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    await dispatch('api/MUTATE', { mutation: 'deleteCharacter', input: { id } }, { root: true })
    const newCharacters = getters.remoteCharacters.slice()
    const index = newCharacters.findIndex(i => i.id === id)
    if (index > -1) {
      newCharacters.splice(index, 1)
    }
    commit('SET_REMOTE_CHARACTERS', newCharacters)
  },
  async DELETE_CHARACTER ({ dispatch, commit, rootGetters, getters }, id) {
    const remote = getters.remoteCharacters.find(i => i.id === id)
    if (rootGetters['auth/isAuthenticated'] && remote) {
      await dispatch('DELETE_REMOTE_CHARACTER', id)
      await dispatch('SYNC_LOCAL_CHARACTERS_TO_REMOTE')
    } else {
      await dispatch('DELETE_LOCAL_CHARACTER', id)
    }
  }
}
