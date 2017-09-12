import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  sidebar: true
};

const mutations = {
  toggleSidebar(state, payload) {
    state.sidebar = payload;
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions: {},
  getters: {},
  modules: {}
});

export default store;
