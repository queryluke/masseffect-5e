import createPersistedState from 'vuex-persistedstate'

export default ({ app, store }) => {
  createPersistedState({
    key: app.$config.version.replace(/\./g, ''),
    paths: [
      'characterBuilder.character',
      'user.bookmarks',
      'user.darkMode',
      'user.imperial'
    ]
  })(store)
}
