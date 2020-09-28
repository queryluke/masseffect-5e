export const state = () => ({
  tabs: [],
  activeTab: null
})

export const getters = {
  tabs: state => state.tabs,
  activeTab: state => state.activeTab
}

export const mutations = {
  SET_TABS (state, value) {
    state.tabs = value
  },
  SET_ACTIVE_TAB (state, value) {
    state.activeTab = value
  }
}
