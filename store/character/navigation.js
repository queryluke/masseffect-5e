export const state = () => ({
  mobileMenu: false,
  mobileView: 'abilities',
  mobileSettingsMenu: false,
  mobileRoller: false,
  settingsTabs: ['Defensive', 'Offensive', 'Powercasting', 'Ability Scores', 'Proficiencies', 'Speed & Senses', 'Custom'],
  actionsTabs: ['All', 'Attacks', 'Actions', 'Bonus Actions', 'Reactions', 'Other'],
  featuresTabs: ['All', 'Class Features', 'Species Traits', 'Reputation Benefits', 'Feats'],
  sideNavbar: false,
  sideNavbarComponent: 'me-cs-logs-list',
  restMenu: false,
  settingsTab: 0,
  actionsTab: 0,
  featuresTab: 0,
  smDetailsNotes: false
})

export const getters = {
  mobileMenu: state => state.mobileMenu,
  mobileView: state => state.mobileView,
  mobileSettingsMenu: state => state.mobileSettingsMenu,
  mobileRoller: state => state.mobileRoller,
  sideNavbar: state => state.sideNavbar,
  sideNavbarComponent: state => state.sideNavbarComponent,
  restMenu: state => state.restMenu,
  settingsTab: state => state.settingsTab,
  actionsTab: state => state.actionsTab,
  featuresTab: state => state.featuresTab,
  smDetailsNotes: state => state.smDetailsNotes
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
