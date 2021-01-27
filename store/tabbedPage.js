export const state = () => ({
  tabs: [],
  activeTab: null,
  theme: false,
  tabColor: 'primary',
  mobileTabColor: 'primary'
})

export const getters = {
  tabs: state => state.tabs,
  activeTab: state => state.activeTab,
  tabColor: state => state.tabColor,
  theme: state => state.theme,
  mobileTabColor: state => state.mobileTabColor
}

export const mutations = {
  SET_TABS (state, value) {
    state.tabs = value
  },
  SET_ACTIVE_TAB (state, value) {
    state.activeTab = value
  },
  SET_TAB_COLOR (state, value) {
    state.tabColor = value
  },
  SET_THEME (state, value) {
    state.theme = value
  },
  SET_MOBILE_TAB_COLOR (state, value) {
    state.mobileTabColor = value
  }
}

export const actions = {
  INIT_THEME ({ getters, commit, rootGetters, dispatch }, { theme = null, isDark = null }) {
    let value = false
    if (theme) {
      value = rootGetters['config/classThemes'][theme]
    }
    commit('SET_THEME', value)
    commit('SET_MOBILE_TAB_COLOR', getters.theme.dark.tabColor)
    dispatch('SET_THEME_MODE', isDark)
  },
  SET_THEME_MODE ({ getters, commit }, isDark) {
    let tabColor = 'primary'
    if (getters.theme) {
      tabColor = getters.theme[isDark ? 'dark' : 'light'].tabColor
    }
    commit('SET_TAB_COLOR', tabColor)
  }
}
