const config = require('~/package.json')

export default {
  bookmarks: [],
  mobileFilterDialog: false,
  pageTitle: 'Mass Effect 5e',
  primaryNavigation: [
    { route: '/phb/intro', title: 'Player\'s Manual' },
    { route: '/assets', title: 'Assets' },
    { route: '/changelog', title: 'Changelog' },
    { route: '/about', title: 'About' },
    { route: '/contributing', title: 'Feedback' }
  ],
  races: ['angara', 'asari', 'batarian', 'drell', 'geth', 'human', 'krogan', 'prothean', 'quarian', 'salarian', 'turian', 'unshackled-ai', 'volus', 'vorcha'],
  sidebar: true,
  version: config.version
}
