import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
  sidebar: true,
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
  }
};

const mutations = {
  toggleSidebar(state, payload) {
    state.sidebar = payload;
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
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions: {},
  getters: {},
  modules: {},
  plugins: [createPersistedState()]
});

export default store;
