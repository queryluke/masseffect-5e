import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
  sidebar: true,
  globalDialog: {
    show: false,
    component: ''
  },
  gruntConfig: {
    cr: {},
    race: {id: 'random', name: 'Random'},
    sc: {id: 'random', name: 'Random'}
  },
  encounter: {
    npcs: {
      list: [],
      counts: []
    },
    pcs: []
  },
  bookmarks: [],
  tooltips: []
};

const getTooltips = () => {
  console.log('getting tooltips');
  return Vue.http.get(`../data/conditions.json`).then(response => response.json());
};

const mutations = {
  toggleSidebar(state, payload) {
    state.sidebar = payload;
  },
  toggleGlobalDialog(state, payload) {
    state.globalDialog.show = payload;
  },
  updateGlobalDialogComponent(state, payload) {
    state.globalDialog.component = payload;
  },
  updateGruntConfigCr(state, payload) {
    state.gruntConfig.cr = payload;
  },
  updateGruntConfigClass(state, payload) {
    state.gruntConfig.sc = payload;
  },
  updateGruntConfigRace(state, payload) {
    state.gruntConfig.race = payload;
  },
  addBookmark(state, payload) {
    state.bookmarks.push(payload);
  },
  removeBookmark(state, index) {
    state.bookmarks.splice(index, 1);
  },
  addEncounterNpc(state, payload) {
    const index = state.encounter.npcs.list.indexOf(payload);
    if (index > -1) {
      state.encounter.npcs.counts[index] += 1;
    } else {
      state.encounter.npcs.list.push(payload);
      state.encounter.npcs.counts.push(1);
    }
  },
  removeEncounterNpc(state, payload) {
    const index = state.encounter.npcs.list.indexOf(payload);
    if (index > -1) {
      state.encounter.npcs.counts.splice(index, 1);
      state.encounter.npcs.list.splice(index, 1);
    }
  },
  setTooltips(state, payload) {
    state.tooltips = payload;
  }
};

const actions = {
  addBookmark({commit}, payload) {
    console.log(payload);
    commit('addBookmark', payload);
  },
  removeBookmark({state, commit}, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id);
    if (index > -1) {
      commit('removeBookmark', index);
    }
  },
  showGlobalDialog({commit}, payload) {
    commit('toggleGlobalDialog', true);
    commit('updateGlobalDialogComponent', payload);
  },
  hideGlobalDialog({commit}) {
    commit('toggleGlobalDialog', false);
  },
  setTooltips({commit}) {
    console.log(getTooltips());
    return getTooltips().then(response => {
      commit('setTooltips', response.data);
    });
  }
};

const getters = {
  globalDialog: state => {
    return state.globalDialog;
  },
  bookmarks: state => {
    return state.bookmarks;
  },
  bookmarkCount: (state, getters) => {
    return getters.bookmarks.length;
  },
  isBookmarked: (state, getters) => card => {
    return getters.bookmarks.find(bookmark => bookmark.card.id === card.id) !== undefined;
  },
  tooltips: state => {
    return state.tooltips;
  },
  bookmarksGroupedByType: (state, getters) => {
    return getters.bookmarks.reduce((rv, x) => {
      (rv[x.type] = rv[x.type] || []).push(x.card);
      return rv;
    }, {});
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [createPersistedState()]
});

export default store;
