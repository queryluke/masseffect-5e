export default {
  addBookmark({commit}, payload) {
    commit('addBookmark', payload);
  },
  removeBookmark({state, commit}, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id);
    if (index > -1) {
      commit('removeBookmark', index);
    }
  },
  updateGruntConfig({commit}, payload) {
    commit('updateGruntConfig', payload);
  },
  showGlobalDialog({commit}, payload) {
    commit('toggleGlobalDialog', true);
    commit('updateGlobalDialogComponent', payload);
  },
  hideGlobalDialog({commit}) {
    commit('toggleGlobalDialog', false);
  }
};
