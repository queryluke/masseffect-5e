export const state = () => ({
  data: {},
  pageTitle: null,
  drawer: null,
  jumpNav: null,
  rules: [],
  pastVersions: [
    {
      name: 'v1.2.0',
      link: 'http://versions.n7.world/v120'
    },
    {
      name: 'v0.9.1',
      link: 'http://versions.n7.world/v091'
    },
    {
      name: 'v0.8.4',
      link: 'http://versions.n7.world/v084'
    }
  ]
})

export const getters = {
  drawer: state => state.drawer,
  jumpNav: state => state.jumpNav,
  rules: state => state.rules,
  isLocaleSet: state => typeof state.data[state.i18n.locale] !== 'undefined',
  // TODO: interpolate non-translated data
  getData: (state, getters) => (endpoint) => {
    const locale = state.i18n.locale
    if (!getters.isLocaleSet) {
      return false
    }
    return typeof state.data[locale][endpoint] === 'undefined' ? false : state.data[locale][endpoint]
  },
  getItem: (state, getters) => (endpoint, id) => {
    const data = getters.getData(endpoint)
    return data === false ? false : data.find(d => d.id === id)
  },
  pageTitle: state => state.pageTitle,
  pastVersions: state => state.pastVersions
}

export const mutations = {
  setData (state, { locale, endpoint, data }) {
    const localeData = { ...state.data[locale], [endpoint]: data }
    state.data = { ...state.data, [locale]: localeData }
  },
  initLocale (state, locale) {
    state.data = { ...state.data, [locale]: {} }
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
    return await Promise.all(endpoints.map(i => dispatch('FETCH_DATA', i)))
  },
  async FETCH_DATA ({ getters, commit }, endpoint) {
    const locale = this.$i18n.locale
    if (!getters.isLocaleSet) {
      commit('initLocale', locale)
    }
    let data = getters.getData(endpoint)
    if (!data) {
      console.log(`getting ${endpoint}`)
      try {
        data = await this.$http.$get(`${locale}/${endpoint}.json`)
      } catch (e) {
        data = await this.$http.$get(`en/${endpoint}.json`)
      }
      commit('setData', { locale, endpoint, data })
    }
    return data
  },
  async FETCH_ITEM ({ getters, dispatch, commit }, { endpoint, id }) {
    let data = getters.getData(this.$i18n.locale, endpoint)
    if (!data) {
      data = await dispatch('FETCH_DATA', endpoint)
    }
    return data.find(i => i.id === id)
  }
}
