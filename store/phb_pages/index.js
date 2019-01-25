import state from './state'

export default {
  namespaced: true,
  state,
  mutations: {},
  actions: {
    toggleSidebar ({dispatch}) {
      dispatch('toggleSidebar', null, { root: true })
    },
    toggleMobileFilterDialog ({dispatch}) {
      dispatch('itemList/toggleMobileFilterDialog', null, {root: true})
    },
    updateSearchString ({dispatch}, payload) {
      dispatch('itemList/updateSearchString', payload, {root: true})
    }
  },
  getters: {
    mobileFilterDialog: (state, getters, rootState) => rootState.itemList.mobileFilterDialog,
    pages: state => state.pages,
    searchString: (state, getters, rootState) => rootState.itemList.searchString,
    primaryNavigation: (state, getters, rootState) => rootState.primaryNavigation,
    races: (state, getters, rootState) => rootState.races,
    version: (state, getters, rootState, rootGetters) => rootGetters.getVersion
  }
}
