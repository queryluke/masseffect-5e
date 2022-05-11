import createPersistedState from 'vuex-persistedstate'

export default ({ app, store }) => {
  createPersistedState({
    key: 'v140',
    paths: [
      'auth.isAuthenticated',
      'auth.redirect',
      'user.bookmarks',
      'user.darkMode',
      'user.imperial',
      'characters.localCharacters',
      'characters.localLogs',
      'migrator.migrated'
    ]
  })(store)
}
