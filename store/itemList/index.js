export default {
  namespaced: true,
  state: {
    sortBy: {},
    order: 1,
    filters: {
      weapons: {
        type: [],
        rarity: []
      },
      spells: {
        type: [],
        availableClasses: []
      },
      weaponMods: {
        placement: [],
        weaponType: []
      }
    },
    mobileFilterDialog: false,
    searchString: ''
  },
  mutations: {
    update (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    updateList ({commit}, payload) {
      commit('update', payload)
    },
    toggleMobileFilterDialog ({commit, getters}) {
      commit('update', {key: 'mobileFilterDialog', value: !getters.mobileFilterDialog})
    },
    updateSearchString ({commit}, payload) {
      commit('update', {key: 'searchString', value: payload})
    },
    updateFilter ({getters, commit}, payload) {
      const currentFilters = getters.filters
      currentFilters[payload.key][payload.filterKey] = payload.value
      commit('update', {key: 'filters', value: currentFilters})
    }
  },
  getters: {
    sortBy: state => state.sortBy,
    order: state => state.order,
    type: state => state.type,
    rarity: state => state.rarity,
    searchString: state => state.searchString,
    getItems: (state, getters, rootState, rootStateGetters) => (name) => rootStateGetters.getData(name),
    filters: state => state.filters,
    mobileFilterDialog: state => state.mobileFilterDialog
  }
}
