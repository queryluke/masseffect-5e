export default {
  bookmarkCount: (state, getters) => {
    return getters.bookmarks.length
  },
  bookmarks: state => {
    return state.bookmarks
  },
  bookmarksGroupedByType: (state, getters) => {
    return getters.bookmarks.reduce((rv, x) => {
      (rv[x.type] = rv[x.type] || []).push(x.card)
      return rv
    }, {})
  },
  getVersion: state => {
    return state.version
  },
  isBookmarked: (state, getters) => card => {
    return getters.bookmarks.find(bookmark => bookmark.card.id === card.id) !== undefined
  },
  mobileFilterDialog: state => {
    return state.mobileFilterDialog
  },
  primaryNavigation: (state) => {
    return state.primaryNavigation
  },
  sidebar: state => {
    return state.sidebar
  }
}
