import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  localCharacterIndex: null
})

export const getters = {
  localCharacterIndex: state => state.localCharacterIndex
}

export const mutations = {
  SET_LOCAL_CHARACTER_INDEX (state, value) {
    state.localCharacterIndex = value
  }
}

export const actions = {
  LOAD_CHARACTER ({ rootGetters, commit }, id) {
    const index = rootGetters['characters/characters'].findIndex(i => i.id.toString() === id.toString())
    if (index > -1) {
      commit('SET_LOCAL_CHARACTER_INDEX', index)
      commit('character/SET_CHARACTER', rootGetters['characters/characters'][index], { root: true })
      commit('character/SET_CHARACTER_ID', id, { root: true })
    }
  },
  LOCAL_LOG_WRITE ({ rootGetters, commit }, payload) {
    const logs = cloneDeep(rootGetters['characters/localLogs'])
    const activeCharacterId = rootGetters['character/id']
    if (logs[activeCharacterId]) {
      logs[activeCharacterId].push(payload)
    } else {
      logs[activeCharacterId] = [payload]
    }
    commit('characters/SET_LOCAL_LOGS', logs, { root: true })
  },
  LOCAL_LOG_DESTROY ({ rootGetters, commit }) {
    const logs = cloneDeep(rootGetters['characters/localLogs'])
    const activeCharacterId = rootGetters['character/id']
    if (logs[activeCharacterId]) {
      logs[activeCharacterId] = []
    }
    commit('characters/SET_LOCAL_LOGS', logs, { root: true })
  }
}
