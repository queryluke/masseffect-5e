export default {
  addBookmark ({commit}, payload) {
    commit('addBookmark', payload)
  },
  instantiateState ({getters, commit}, payload) {
    if (getters.stateKeys.includes(payload.key)) {
      commit('update', payload)
    }
  },
  removeBookmark ({state, commit}, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id)
    if (index > -1) {
      commit('removeBookmark', index)
    }
  },
  toggleSidebar ({getters, commit}) {
    commit('toggleSidebar', !getters.sidebar)
  },
  updateGruntConfig ({commit}, payload) {
    commit('updateGruntConfig', payload)
  }
}
