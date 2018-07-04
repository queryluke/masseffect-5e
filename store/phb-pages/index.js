import state from './state'

export default {
  namespaced: true,
  state,
  mutations: {
    toggleMobileFilterDialog (state, payload) {
      state.mobileFilterDialog = payload
    },
    updateSearchString (state, payload) {
      state.searchString = payload
    }
  },
  actions: {
    toggleSidebar ({dispatch}) {
      dispatch('toggleSidebar', null, { root: true })
    },
    toggleMobileFilterDialog ({getters, commit}) {
      commit('toggleMobileFilterDialog', !getters.mobileFilterDialog)
    },
    updateSearchString ({commit}, payload) {
      commit('updateSearchString', payload)
    }
  },
  getters: {
    mobileFilterDialog: state => state.mobileFilterDialog,
    pages: state => state.pages,
    searchString: state => state.searchString,
    primaryNavigation: (state, getters, rootState) => rootState.primaryNavigation
  }
}
