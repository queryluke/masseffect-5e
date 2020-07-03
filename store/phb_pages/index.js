import state from './state'

export default {
  namespaced: true,
  state,
  mutations: {},
  actions: {
    toggleSidebar ({ dispatch }) {
      dispatch('toggleSidebar', null, { root: true })
    },
    toggleMobileFilterDialog ({ dispatch }) {
      dispatch('itemList/toggleMobileFilterDialog', null, { root: true })
    },
    updateSearchString ({ dispatch }, payload) {
      dispatch('itemList/updateSearchString', payload, { root: true })
    },
    updateActiveClassTab ({ dispatch }, payload) {
      dispatch('classPage/setActiveTab', payload, { root: true })
    },
    toggleRulebar ({ dispatch }) {
      dispatch('toggleRulebar', null, { root: true })
    },
    setRulebar ({ dispatch }, payload) {
      dispatch('setRulebar', payload, { root: true })
    },
    setSearchbar ({ dispatch }, payload) {
      dispatch('setSearchbar', payload, { root: true })
    }
  },
  getters: {
    activeClassTab: (state, getters, rootState) => rootState.classPage.active,
    classes: (state, getters, rootState) => rootState.classes,
    classTabs: (state, getters, rootState) => rootState.classPage.tabs,
    mobileFilterDialog: (state, getters, rootState) => rootState.itemList.mobileFilterDialog,
    pages: state => state.pages,
    primaryNavigation: (state, getters, rootState) => rootState.primaryNavigation,
    races: (state, getters, rootState) => rootState.races,
    rulebar: (state, getters, rootState) => rootState.rulebar,
    searchbar: (state, getters, rootState) => rootState.searchbar,
    searchString: (state, getters, rootState) => rootState.itemList.searchString,
    version: (state, getters, rootState, rootGetters) => rootGetters.getVersion
  }
}
