export default {
  addBookmark (state, payload) {
    state.bookmarks.push(payload)
  },
  toggleMobileFilterDialog (state) {
    state.mobileFilterDialog = !state.mobileFilterDialog
  },
  removeBookmark (state, index) {
    state.bookmarks.splice(index, 1)
  },
  toggleSidebar (state, payload) {
    state.sidebar = payload
  },
  setRulebar (state, payload) {
    state.rulebar = payload
  },
  setSearchbar (state, payload) {
    state.searchbar = payload
  },
  update (state, payload) {
    state[payload.key] = payload.items
  },
  setPhbSearch (state, payload) {
    state.phbSearch = payload
  }
}
