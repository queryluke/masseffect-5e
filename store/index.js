const config = require('~/package.json')

export const state = () => ({
  data: {},
  pageTitle: null,
  drawer: null,
  jumpNav: null,
  rules: [],
  version: config.version,
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
  ],
  navigation: [
    {
      header: 'Player\'s Manual'
    },
    {
      name: 'Introduction',
      icon: 'mdi-book-open-variant',
      to: '/manual/intro'
    },
    {
      name: 'Rules',
      icon: 'mdi-gavel',
      items: [
        { name: 'Step-by-step Characters', icon: 'supervised_user_circle', to: '/manual/character-creation' },
        { name: 'Beyond 1st Level', icon: 'tending_up', to: '/manual/beyond-first-level' },
        { name: 'Using Ability Scores', icon: 'gamepad', to: '/manual/using-ability-scores' },
        { name: 'Missions', icon: 'map', to: '/manual/missions' },
        { name: 'Equipment', icon: 'category', to: '/manual/equipment' },
        { name: 'Finances', icon: 'money', to: '/manual/finances' },
        { name: 'Vehicles', icon: '', to: '/manual/vehicles' },
        { name: 'Combat', icon: '', to: '/manual/combat' },
        { name: 'Powercasting', icon: '', to: '/manual/powercasting' },
        { name: 'About the Bestiary', icon: '', to: '/manual/bestiary' }
      ]
    },
    {
      name: 'Characters',
      icon: 'mdi-face-agent',
      items: [
        { to: '/classes', name: 'Classes' },
        { to: '/species', name: 'Species' },
        { to: '/feats', name: 'Feats' },
        { to: '/backgrounds', name: 'Backgrounds' }
      ]
    },
    {
      name: 'Equipment',
      icon: 'mdi-hammer-wrench',
      items: [
        { to: '/weapons', name: 'Weapons' },
        { to: '/armor', name: 'Armor' },
        { to: '/mods', name: 'Mods' },
        { to: '/gear', name: 'Gear' },
        { to: '/vehicles', name: 'Vehicles' }
      ]
    },
    {
      name: 'Powers',
      icon: 'mdi-fire',
      to: '/powers'
    },
    {
      name: 'Bestiary',
      icon: 'mdi-paw',
      to: '/bestiary'
    },
    {
      name: 'Appendix',
      icon: 'mdi-view-split-vertical',
      items: [
        { to: '/appendix/conditions', name: 'Conditions' },
        { to: '/appendix/random-height-weight', name: 'Random Height & Weight' },
        { to: '/appendix/skills', name: 'Skills' },
        { to: '/appendix/tool-profs', name: 'Tool Proficiencies' },
        { to: '/appendix/weapon-properties', name: 'Weapon Properties' }
      ]
    },
    {
      name: 'Bookmarks',
      icon: 'mdi-book',
      to: '/bookmarks'
    },
    {
      divider: true
    },
    {
      header: 'Site Tools & Guides'
    },
    {
      name: 'Characer Builder (beta)',
      to: '/character-builder',
      icon: 'mdi-clipboard-account'
    },
    {
      name: 'Generators',
      icon: 'mdi-cog-sync',
      group: 'generator',
      items: [
        { to: '/generators/loot', name: 'Loot Generator' },
        { to: '/generators/npc', name: 'NPC Generator' }
      ]
    },
    {
      name: 'Guides',
      icon: 'mdi-puzzle',
      group: 'guide',
      items: [
        { to: '/guide/armor-creation', name: 'Creating Armor' },
        { to: '/guide/vehicle-creation', name: 'Creating Vehicles' },
        { to: '/guide/encounter-creation', name: 'Creating Encounters' }
      ]
    }
  ],
  mainNavigation: [
    { to: '/manual/intro', name: 'Player\'s Manual' },
    { to: '/assets', name: 'Assets' },
    { to: '/changelog', name: 'Changelog' },
    { to: '/about', name: 'About' },
    { to: '/character-builder', name: 'Character Builder (BETA)' }
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
  getItem: (state, getters) => (endpoint, id) => {
    const data = getters.getData(endpoint)
    return data === false ? false : data.find(d => d.id === id)
  },
  pageTitle: state => state.pageTitle,
  navigation: state => state.navigation,
  mainNavigation: state => state.mainNavigation,
  pastVersions: state => state.pastVersions
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
    return await Promise.all(endpoints.map(i => dispatch('FETCH_DATA', i)))
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
