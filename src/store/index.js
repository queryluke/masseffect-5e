import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import persistentState from './persistentState';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [createPersistedState({
    paths: persistentState
  })]
});

export default store;
