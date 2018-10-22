const config = require('~/package.json')

export default {
  bookmarks: [],
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
  version: config.version
}
