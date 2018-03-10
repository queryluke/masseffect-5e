export default {
  bookmarkCount: (state, getters) => {
    return getters.bookmarks.length;
  },
  bookmarks: state => {
    return state.bookmarks;
  },
  bookmarksGroupedByType: (state, getters) => {
    return getters.bookmarks.reduce((rv, x) => {
      (rv[x.type] = rv[x.type] || []).push(x.card);
      return rv;
    }, {});
  },
  globalDialog: state => {
    return state.globalDialog;
  },
  isBookmarked: (state, getters) => card => {
    return getters.bookmarks.find(bookmark => bookmark.card.id === card.id) !== undefined;
  },
  SPELLS: state => {
    return state.data.spells;
  },
  tooltips: state => {
    return state.tooltips;
  },
  WEAPONS: state => {
    return state.data.weapons;
  }
};
