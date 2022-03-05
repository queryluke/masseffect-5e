export const state = () => ({
  mobileMenu: false,
  mobileView: 'abilities',
  settingsMenu: false,
  mobileRoller: false,
  settingsTabs: ['Defensive', 'Offensive', 'Powercasting', 'Ability Scores', 'Proficiencies', 'Speed & Senses', 'Custom'],
  actionsTabs: ['All', 'Attacks', 'Actions', 'Bonus Actions', 'Reactions', 'Other'],
  featuresTabs: ['All', 'Class Features', 'Species Traits', 'Reputation Benefits', 'Feats'],
  sideNav: false,
  sideNavComponent: 'me-cs-logs-list',
  restMenu: false,
  settingsTab: 0,
  actionsTab: 0,
  featuresTab: 0,
  smDetailsNotes: false
})

export const getters = {
  mobileMenu: state => state.mobileMenu,
  mobileView: state => state.mobileView,
  settingsMenu: state => state.settingsMenu,
  mobileRoller: state => state.mobileRoller,
  sideNav: state => state.sideNav,
  sideNavComponent: state => state.sideNavComponent,
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
  SHOW_SIDE_NAV ({ commit, getters }, component) {
    if (getters.sideNavComponent !== component) {
      commit('SET', { key: 'sideNavComponent', value: component })
    }
    if (!getters.sideNav) {
      commit('SET', { key: 'sideNav', value: true })
    }
  }
}
