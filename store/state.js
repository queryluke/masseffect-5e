import data from './data'
const config = require('~/package.json')

export default {
  backgrounds: [],
  bookmarks: [],
  classes: [],
  classFeatures: [],
  conditions: [],
  data,
  encounter: {
    npcs: {
      list: [],
      counts: []
    },
    pcs: []
  },
  gruntConfig: {
    cr: {},
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
