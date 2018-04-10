import data from './data'
const config = require('~/package.json')

export default {
  bookmarks: [],
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
  tooltips: [],
  posts: [],
  data,
  version: config.version,
  versions: []
}
