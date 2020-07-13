const config = require('~/package.json')

export const state = () => ({
  data: {},
  pageTitle: null,
  drawer: null,
  jumpNav: null,
  rules: [],
  version: config.version,
  pageSearch: null,
  mobileFilterDialog: false,
  // legacy
  classes: ['adept', 'engineer', 'infiltrator', 'sentinel', 'soldier', 'vanguard'],
  races: ['angara', 'asari', 'batarian', 'drell', 'elcor', 'geth', 'hanar', 'human', 'krogan', 'prothean', 'quarian', 'salarian', 'turian', 'volus', 'vorcha'],
  sidebar: true,
  rulebar: true,
  searchbar: false,
  phbSearch: '',
  searchFilters: [
    { id: 'character', textColor: 'light-green--text text--darken-4', color: 'light-green darken-4', icon: 'face' },
    { id: 'equipment', textColor: 'deep-orange--text text--darken-4', color: 'deep-orange darken-4', icon: 'build' },
    { id: 'rule', textColor: 'secondary--text', color: 'secondary', icon: 'gavel' },
    { id: 'spell', textColor: 'purple--text', color: 'purple', icon: 'whatshot' },
    { id: 'bestiary', textColor: 'primary--text', color: 'primary', icon: 'pets' }
  ]
})

export const getters = {
  version: state => state.version,
  drawer: state => state.drawer,
  jumpNav: state => state.jumpNav,
  rules: state => state.rules,
  getData: state => (endpoint) => {
    return typeof state.data[endpoint] === 'undefined' ? false : state.data[endpoint]
  },
  mobileFilterDialog: state => state.mobileFilterDialog,
  pageSearch: state => state.pageSearch,
  pageTitle: state => state.pageTitle,
  // legacy
  bookmarkCount: (state, getters) => {
    return getters.bookmarks.length
  },
  bookmarks: state => state.bookmarks,
  bookmarksGroupedByType: (state, getters) => {
    return getters.bookmarks.reduce((rv, x) => {
      (rv[x.type] = rv[x.type] || []).push(x.card)
      return rv
    }, {})
  },
  isBookmarked: (state, getters) => (card) => {
    return getters.bookmarks.find(bookmark => bookmark.card.id === card.id) !== undefined
  },
  sidebar: state => state.sidebar,
  rulebar: state => state.rulebar,
  searchbar: state => state.searchbar,
  races: state => state.races,
  phbSearch: state => state.phbSearch,
  searchFilters: state => state.searchFilters
}

export const mutations = {
  setData (state, { endpoint, data }) {
    state.data = { ...state.data, [endpoint]: data }
  },
  drawer (state, value) {
    state.drawer = value
  },
  jumpNav (state, value) {
    state.jumpNav = value
  },
  mobileFilterDialog (state, value) {
    state.mobileFilterDialog = value
  },
  pageTitle (state, value) {
    state.pageTitle = value
  },
  pageSearch (state, value) {
    state.pageSearch = value
  },
  setCurrentRules (state, value) {
    state.rules = value
  },
  // legacy
  addBookmark (state, payload) {
    state.bookmarks.push(payload)
  },
  removeBookmark (state, index) {
    state.bookmarks.splice(index, 1)
  },
  toggleSidebar (state, payload) {
    state.sidebar = payload
  },
  setRulebar (state, payload) {
    state.rulebar = payload
  },
  setSearchbar (state, payload) {
    state.searchbar = payload
  },
  update (state, payload) {
    state[payload.key] = payload.items
  },
  setPhbSearch (state, payload) {
    state.phbSearch = payload
  }
}

export const actions = {
  async FETCH_DATA ({ getters, commit }, endpoint) {
    let data = getters.getData(endpoint)
    if (!data) {
      data = await this.$axios.$get(`${endpoint}.json`)
      commit('setData', { endpoint, data })
    }
    return data
  },
  async FETCH_ITEM ({ getters, dispatch }, { endpoint, id }) {
    let data = getters.getData(endpoint)
    if (!data) {
      data = await dispatch('FETCH_DATA', endpoint)
    }
    return data.find(i => i.id === id)
  },
  // legacy
  addBookmark ({ commit }, payload) {
    commit('addBookmark', payload)
  },
  removeBookmark ({ state, commit }, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id)
    if (index > -1) {
      commit('removeBookmark', index)
    }
  },
  toggleSidebar ({ getters, commit }) {
    commit('toggleSidebar', !getters.sidebar)
  },
  toggleRulebar ({ getters, commit }) {
    commit('setRulebar', !getters.rulebar)
  },
  setRulebar ({ commit }, payload) {
    commit('setRulebar', payload)
  },
  setSearchbar ({ commit }, payload) {
    commit('setSearchbar', payload)
  },
  setPhbSearch ({ commit }, payload) {
    commit('setPhbSearch', payload)
  }
}
