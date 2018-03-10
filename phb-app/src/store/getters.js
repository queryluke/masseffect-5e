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
  getData: state => name => {
    const data = state.data[name];
    if (typeof data === 'object' && data.data) {
      return data.data;
    }
    return data;
  },
  getSheetUrl: state => name => {
    return state.data[name].source;
  },
  getSheetUpdated: state => name => {
    return state.data[name].updated;
  },
  getMutableData: (state, getters) => name => {
    return JSON.parse(JSON.stringify(getters.getData(name)));
  },
  tooltips: state => {
    return state.tooltips;
  }
};
