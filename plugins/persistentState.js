import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'v130',
    paths: [
      'characterBuilder.character',
      'user.bookmarks'
    ]
  })(store)
}
