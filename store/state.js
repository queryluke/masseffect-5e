import data from './data'
const config = require('~/package.json')

export default {
  backgrounds: [],
  bookmarks: [],
  classes: [],
  classFeatures: [],
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
  sidebar: true,
  spellListOptions: {
    sortBy: { key: 'name', display: 'Name' },
    order: 1,
    searchString: '',
    filters: {
      type: [],
      available_classes: []
    }
  },
  tooltips: [],
  posts: [],
  kits: [],
  data,
  version: config.version,
  versions: []
}
