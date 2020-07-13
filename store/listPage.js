import debounce from 'lodash/debounce'

export const state = () => ({
  search: '',
  showSearchBar: false,
  showFilterDialog: false,
  showSortDialog: false,
  activeFilters: false,
  mobileSortLabel: '',
  mobileSortDesc: true,
  sortables: []
})

export const getters = {
  search: state => state.search,
  showSearchBar: state => state.showSearchBar,
  showFilterDialog: state => state.showFilterDialog,
  showSortDialog: state => state.showSortDialog,
  mobileSortLabel: state => state.mobileSortLabel,
  mobileSortDesc: state => state.mobileSortDesc,
  activeFilters: state => state.activeFilters
}

export const mutations = {
  SET_SEARCH (state, value) {
    state.search = value
  },
  TOGGLE_SEARCH_BAR (state, value = null) {
    state.showSearchBar = value === null ? !state.showSearchBar : value
  },
  TOGGLE_FILTER_DIALOG (state, value = null) {
    state.showFilterDialog = value === null ? !state.showFilterDialog : value
  },
  TOGGLE_SORT_DIALOG (state, value = null) {
    state.showSortDialog = value === null ? !state.showSortDialog : value
  },
  TOGGLE_MOBILE_SORT_DESC (state, value) {
    state.mobileSortDesc = value === null ? !state.mobileSortDesc : value
  },
  SET_MOBILE_SORT_LABEL (state, value) {
    state.mobileSortLabel = value
  },
  INDICATE_ACTIVE_FILTERS (state) {
    state.activeFilters = true
  },
  INDICATE_NO_FILTERS (state) {
    state.activeFilters = false
  }
}

export const actions = {
  RESET ({ commit }) {
    commit('NO_FILTERS')
    commit('SET_SEARCH', '')
  },
  DEBOUNCED_SET_SEARCH: debounce(({ commit }, value) => {
    commit('SET_SEARCH', value)
  }, 200)
}
