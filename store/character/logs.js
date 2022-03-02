export const state = () => ({
})

export const getters = {
  logs: (state, getters, rootState, rootGetters) => {
    return rootGetters['characters/localLogs'][rootGetters['character/id']]
  }
}

export const mutations = {
}

export const actions = {
  async LOG_WRITE ({ rootGetters, dispatch }, payload) {
    // TODO: API CALLS
    await dispatch('character/local/LOCAL_LOG_WRITE', payload, { root: true }) // note calling this from a separate vuex module
  },
  async LOG_DESTROY ({ rootGetters, dispatch }) {
    // TODO: API CALLS?
    await dispatch('character/local/LOCAL_LOG_DESTROY', null, { root: true }) // note calling this from a separate vuex module
  }
}
