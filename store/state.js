const config = require('~/package.json')

export default {
  backgrounds: [],
  bookmarks: [],
  classes: [],
  classFeatures: [],
  conditions: [],
  encounter: {
    npcs: {
      list: [],
      counts: []
    },
    pcs: []
  },
  gruntConfig: {
    cr: { id: 1, cr: '1/8', profBonus: 2, acDc: 13, hpMin: 8, hpMax: 36, attackBonus: 3, dmgMin: 0, dmgMax: 6, abReduction: [6, 7, 8], xp: '25', spellcastingLevel: 1 },
    race: {id: 'random', name: 'Random'},
    sc: {id: 'random', name: 'Random'}
  },
  kits: [],
  mobileFilterDialog: false,
  pageTitle: 'Mass Effect 5e',
  primaryNavigation: [
    { route: '/phb/intro', title: 'Player\'s Handbook' },
    { route: '/assets', title: 'Assets' },
    { route: '/changelog', title: 'Changelog' },
    { route: '/about', title: 'About' },
    { route: '/contributing', title: 'Feedback' }
  ],
  sidebar: true,
  spells: [],
  version: config.version,
  versions: []
}
