import createPersistedState from 'vuex-persistedstate'

export default ({ app, store }) => {
  createPersistedState({
    key: app.$config.version.replace(/\./g, ''),
    paths: [
      'user.bookmarks',
      'user.darkMode',
      'user.imperial',
      'cb.characters',
      'migrator.migrated',
      'auth.redirect'
    ]
  })(store)
}
