const config = require('~/package.json')

export const state = () => ({
  data: {},
  pageTitle: null,
  drawer: null,
  jumpNav: null,
  rules: [],
  version: config.version
})

export const getters = {
  version: state => state.version,
  drawer: state => state.drawer,
  jumpNav: state => state.jumpNav,
  rules: state => state.rules,
  getData: state => (endpoint) => {
    return typeof state.data[endpoint] === 'undefined' ? false : state.data[endpoint]
  },
  getItem: (state, getters) => (endpoint, id) => {
    const data = getters.getData(endpoint)
    return data === false ? false : data.find(d => d.id === id)
  },
  pageTitle: state => state.pageTitle
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
  pageTitle (state, value) {
    state.pageTitle = value
  },
  setCurrentRules (state, value) {
    state.rules = value
  }
}

export const actions = {
  async FETCH_LOTS ({ getters, commit, dispatch }, endpoints) {
    await Promise.all(endpoints.map(i => dispatch('FETCH_DATA', i)))
  },
  async FETCH_DATA ({ getters, commit }, endpoint) {
    let data = getters.getData(endpoint)
    if (!data) {
      data = await this.$axios.$get(`${endpoint}.json`)
      commit('setData', { endpoint, data })
    }
    return data
  },
  async FETCH_ITEM ({ getters, dispatch, commit }, { endpoint, id }) {
    let data = getters.getData(endpoint)
    if (!data) {
      data = await dispatch('FETCH_DATA', endpoint)
    }
    return data.find(i => i.id === id)
  }
}
