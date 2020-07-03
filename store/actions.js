export default {
  addBookmark ({ commit }, payload) {
    commit('addBookmark', payload)
  },
  removeBookmark ({ state, commit }, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id)
    if (index > -1) {
      commit('removeBookmark', index)
    }
  },
  toggleSidebar ({ getters, commit }) {
    commit('toggleSidebar', !getters.sidebar)
  },
  toggleRulebar ({ getters, commit }) {
    commit('setRulebar', !getters.rulebar)
  },
  setRulebar ({ commit }, payload) {
    commit('setRulebar', payload)
  },
  setSearchbar ({ commit }, payload) {
    commit('setSearchbar', payload)
  },
  setPhbSearch ({ commit }, payload) {
    commit('setPhbSearch', payload)
  }
}
