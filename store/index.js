export const state = () => ({
  data: {},
  pageTitle: null,
  metaSubtitle: null,
  rules: [],
  rawHomebrew: [],
  pageMetaDescription: null,
  drawer: null,
  jumpNav: null,
  versionSnackbar: false,
  currentLocale: 'en',
  pastVersions: [
    {
      name: 'v1.3.1',
      link: 'http://versions.n7.world/v131'
    },
    {
      name: 'v1.3.0',
      link: 'http://versions.n7.world/v130'
    },
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
  ],
  cbVersion: '1.0.2'
})

export const getters = {
  drawer: state => state.drawer,
  jumpNav: state => state.jumpNav,
  rules: (state) => {
    return state.rules
  },
  currentLocale: state => state.currentLocale,
  isLocaleSet: state => typeof state.data[state.currentLocale] !== 'undefined',
  baseData: (state, getters) => (endpoint) => {
    if (!getters.isLocaleSet) {
      return []
    }
    const locale = 'en'
    const baseModels = state.data[locale][endpoint] || state.data[locale].edges?.filter(i => i.type === endpoint)
    return baseModels || []
  },
  rawHomebrew: state => state.rawHomebrew.filter(i => i),
  homebrew: (state, getters) => {
    return getters.rawHomebrew.map((i) => {
      const data = JSON.parse(i.data)
      return {
        ...data,
        id: i.id,
        homebrew: {
          createdBy: i.profile.username || 'anonymous',
          model: i.model
        }
      }
    })
  },
  getData: (state, getters) => (endpoint) => {
    const potentialHomebrew = ['powers', 'weapons']
    if (potentialHomebrew.includes(endpoint)) {
      const homebrewModels = getters.homebrew.filter(i => i.homebrew.model === endpoint)
      return getters.baseData(endpoint).concat(homebrewModels)
    } else {
      return getters.baseData(endpoint)
    }
  },
  getItem: (state, getters) => (endpoint, id) => {
    const data = getters.getData(endpoint)
    return data.length === 0 ? false : data.find(d => d.id === id)
  },
  listFilters: state => (endpoint) => {
    return state.listPage.filters[endpoint]
  },
  pageTitle: state => state.pageTitle,
  metaDescription: state => state.pageMetaDescription,
  metaTitle: state => state.metaSubtitle ? `${state.pageTitle} - ${state.metaSubtitle}` : state.pageTitle,
  pastVersions: state => state.pastVersions,
  versionSnackbar: state => state.versionSnackbar
}

export const mutations = {
  setData (state, { locale, endpoint, data }) {
    const localeData = { ...state.data[locale], [endpoint]: data }
    state.data = { ...state.data, [locale]: localeData }
  },
  initLocale (state) {
    state.data = { ...state.data, [state.currentLocale]: {} }
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
  metaDescription (state, value) {
    state.pageMetaDescription = value
  },
  metaSubtitle (state, value) {
    state.metaSubtitle = value
  },
  setCurrentRules (state, value) {
    state.rules = value
  },
  closeVersionSnackbar (state) {
    state.versionSnackbar = false
  },
  setRawHomebrew (state, value) {
    state.rawHomebrew = value
  }
}

export const actions = {
  SET_META ({ commit }, { title, subTitle = false, description }) {
    commit('pageTitle', title)
    commit('metaSubtitle', subTitle || null)
    commit('metaDescription', description)
  },
  async FETCH_LOTS ({ getters, commit, dispatch }, endpoints) {
    return await Promise.all(endpoints.map(i => dispatch('FETCH_DATA', i)))
  },
  /*
   TODO: when a different locale is picked, need to change the current locale
   */
  async FETCH_DATA ({ getters, commit }, endpoint) {
    // see note above
    if (!getters.isLocaleSet) {
      commit('initLocale')
    }
    const locale = getters.currentLocale
    let data = getters.baseData(endpoint)
    if (data.length === 0) {
      try {
        data = await this.$http.$get(`${locale}/${endpoint}.json`)
      } catch (e) {
        data = await this.$http.$get(`en/${endpoint}.json`)
      }
      commit('setData', { locale, endpoint, data })
    }
    return data
  },
  async FETCH_HOMEBREW_DATA ({ rootGetters, dispatch, commit }) {
    if (!rootGetters['auth/isAuthenticated']) {
      return
    }
    const myId = rootGetters['auth/username']
    let nextToken = null
    const query = 'homebrewUseByUser'
    const homebrew = []
    do {
      const variables = {
        owner: myId,
        limit: 100,
        nextToken
      }
      const { items, nextToken: newNextToken } = await dispatch('api/QUERY', { query, variables }, { root: true })
      homebrew.push(...items.map(i => i.homebrew))
      nextToken = newNextToken
    } while (nextToken)
    commit('setRawHomebrew', homebrew)
  }
}
