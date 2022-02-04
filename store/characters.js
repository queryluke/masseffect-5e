import cloneDeep from 'lodash/cloneDeep'
import jsonpack from 'jsonpack/main'
import { characterTemplate } from '~/mixins/character/template'

export const state = () => ({
  characters: []
})

export const getters = {
  characters: state => state.characters
}

export const mutations = {
  SET_CHARACTERS (state, characters) {
    state.characters = characters
  }
}

export const actions = {
  async FETCH_CHARACTERS ({ dispatch, getters, commit, rootGetters, rootState }) {
    // if not authenticated, do nothing
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    // get the current local characters and attempt to store on AWS, falling back to local as needed
    const unSynced = []
    for (const character of getters.characters) {
      const clone = cloneDeep(character)
      clone.meta.remote = true
      try {
        await dispatch('api/MUTATE', { mutation: 'createCharacter', input: { userId: rootGetters['auth/sub'], data: jsonpack.pack(clone) } }, { root: true })
      } catch (e) {
        clone.meta.remote = false
        unSynced.push(clone)
      }
    }
    // get the aws characters
    let nextToken = null
    const remoteChars = []
    do {
      const response = await dispatch('api/QUERY', { query: 'characterByUser', variables: { userId: rootGetters['auth/sub'], limit: 100, nextToken } }, { root: true })
      nextToken = response.nextToken
      remoteChars.push(...response.items.map((i) => {
        const data = jsonpack.unpack(i.data)
        data.id = i.id
        return data
      }))
    } while (nextToken !== null)
    commit('SET_CHARACTERS', [...unSynced, ...remoteChars])
  },
  async NEW_CHARACTER ({ dispatch, rootState }) {
    const character = cloneDeep(characterTemplate)
    character.meta.version = rootState.cbVersion
    return await dispatch('CREATE_CHARACTER', character)
  },
  async CREATE_CHARACTER ({ dispatch, commit, rootGetters, getters, rootState }, c) {
    let character = c
    if (character.meta?.version !== rootState.cbVersion) {
      character = await dispatch('character/migrator/migrate', character, { root: true })
    }
    if (!character) {
      return
    }
    if (rootGetters['auth/isAuthenticated']) {
      try {
        character.meta.remote = true
        delete character.id
        const response = await dispatch('api/MUTATE', { mutation: 'createCharacter', input: { userId: rootGetters['auth/sub'], data: jsonpack.pack(character) } }, { root: true })
        character.id = response.id
      } catch (e) {
        character.meta.remote = false
        console.log(e)
      }
    }
    console.log(character)
    return dispatch('UPSERT_LOCAL_CHARACTER', character)
  },
  UPSERT_LOCAL_CHARACTER ({ commit, getters }, character) {
    if (!character.id) {
      character.id = new Date().getTime()
    }
    const characters = getters.characters.slice()
    const existingIndex = characters.findIndex(i => i.id === character.id)
    if (existingIndex > -1) {
      characters.splice(existingIndex, 1, character)
    } else {
      characters.push(character)
    }
    console.log('setting characters')
    commit('SET_CHARACTERS', characters)
    return character.id
  },
  async DELETE_CHARACTER ({ dispatch, commit, rootGetters, getters }, id) {
    if (rootGetters['auth/isAuthenticated']) {
      try {
        await dispatch('api/MUTATE', { mutation: 'deleteCharacter', input: { id } }, { root: true })
        commit('SET_CHARACTER', null)
      } catch (e) {
        console.log(e)
      }
    }
    const characters = getters.characters.slice()
    const existingIndex = characters.findIndex(i => i.id === id)
    if (existingIndex > -1) {
      characters.splice(existingIndex, 1)
    }
    commit('SET_CHARACTERS', characters)
  }
}
