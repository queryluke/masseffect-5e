import data from './data'
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
  globalDialog: {
    show: false,
    component: ''
  },
  gruntConfig: {
    cr: {},
    race: {id: 'random', name: 'Random'},
    sc: {id: 'random', name: 'Random'}
  },
  mobileFilterDialog: false,
  pageTitle: 'Mass Effect 5e',
  primaryNavigation: [
    { route: '/phb/intro', title: 'Player\'s Handbook' },
    { route: '/assets', title: 'Assets' },
    { route: '/news', title: 'News' },
    { route: '/about', title: 'About' },
    { route: '/contributing', title: 'Feedback' }
  ],
  searchString: '',
  sidebar: true,
  posts: [],
  kits: [],
  data,
  version: config.version,
  versions: []
}
