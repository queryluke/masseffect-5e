export const state = () => ({
  mobileMenu: false,
  mobileView: 'abilities',
  mobileSettingsMenu: false,
  mobileRoller: false,
  settingsTabs: ['Defensive', 'Offensive', 'Powercasting', 'Ability Scores', 'Proficiencies', 'Speed & Senses', 'Custom'],
  settingsTab: 0,
  sideNavbar: false,
  sideNavbarComponent: 'me-cs-logs-list'
})

export const getters = {
  mobileMenu: state => state.mobileMenu,
  mobileView: state => state.mobileView,
  mobileSettingsMenu: state => state.mobileSettingsMenu,
  mobileRoller: state => state.mobileRoller,
  settingsTab: state => state.settingsTab,
  sideNavbar: state => state.sideNavbar,
  sideNavbarComponent: state => state.sideNavbarComponent
}

export const mutations = {
  SET (state, { key, value }) {
    state[key] = value
  }
}

export const actions = {
  SHOW_SIDE_NAVBAR ({ commit, getters }, component) {
    if (getters.sideNavbarComponent !== component) {
      commit('SET', { key: 'sideNavbarComponent', value: component })
    }
    if (!getters.sideNavbar) {
      commit('SET', { key: 'sideNavbar', value: true })
    }
  }
}
