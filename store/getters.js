export default {
  bookmarkCount: (state, getters) => {
    return getters.bookmarks.length
  },
  bookmarks: state => state.bookmarks,
  bookmarksGroupedByType: (state, getters) => {
    return getters.bookmarks.reduce((rv, x) => {
      (rv[x.type] = rv[x.type] || []).push(x.card)
      return rv
    }, {})
  },
  getVersion: state => state.version,
  isBookmarked: (state, getters) => (card) => {
    return getters.bookmarks.find(bookmark => bookmark.card.id === card.id) !== undefined
  },
  mobileFilterDialog: state => state.mobileFilterDialog,
  primaryNavigation: state => state.primaryNavigation,
  sidebar: state => state.sidebar,
  rulebar: state => state.rulebar,
  searchbar: state => state.searchbar,
  races: state => state.races,
  phbSearch: state => state.phbSearch,
  searchFilters: state => state.searchFilters
}
