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
  getGruntConfig: state => (key = false) => {
    return key ? state.gruntConfig[key] : state.gruntConfig;
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
  getProgressionHeaders: state => name => {
    return state.data[`${name}Progression`].headers;
  },
  tooltips: (state, getters) => {
    return getters.getData('conditions');
  }
};
