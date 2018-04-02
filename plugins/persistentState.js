import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    paths: [
      'gruntConfig',
      'encounter',
      'bookmarks'
    ]
  })(store)
}
