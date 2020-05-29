const config = require('~/package.json')

export default {
  bookmarks: [],
  classes: ['adept', 'engineer', 'infiltrator', 'sentinel', 'soldier', 'vanguard'],
  mobileFilterDialog: false,
  pageTitle: 'Mass Effect 5e',
  primaryNavigation: [
    { route: '/phb/intro', title: 'Player\'s Manual' },
    { route: '/assets', title: 'Assets' },
    { route: '/changelog', title: 'Changelog' },
    { route: '/about', title: 'About' },
    { route: '/contributing', title: 'Feedback' },
    { route: '/character-builder', title: 'Character Builder (BETA)'}
  ],
  races: ['angara', 'asari', 'batarian', 'drell', 'elcor', 'geth', 'hanar', 'human', 'krogan', 'prothean', 'quarian', 'salarian', 'turian', 'volus', 'vorcha'],
  sidebar: true,
  rulebar: true,
  searchbar: false,
  phbSearch: '',
  searchFilters: [
    { id: 'character', textColor: 'light-green--text text--darken-4', color: 'light-green darken-4', icon: 'face' },
    { id: 'equipment', textColor: 'deep-orange--text text--darken-4', color: 'deep-orange darken-4', icon: 'build' },
    { id: 'rule', textColor: 'secondary--text', color: 'secondary', icon: 'gavel' },
    { id: 'spell', textColor: 'purple--text', color: 'purple', icon: 'whatshot' },
    { id: 'bestiary', textColor: 'primary--text', color: 'primary', icon: 'pets' }
  ],
  version: config.version
}
