import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  const previousVersion = store.getters.pastVersions[0]
  createPersistedState({
    key: previousVersion.name.replace(/\./g, ''),
    paths: [
      'migrator.bookmarks',
      'migrator.darkMode',
      'migrator.bookmarks',
      'migrator.characters'
    ]
  })(store)
}
