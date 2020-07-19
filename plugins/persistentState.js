import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: [
      'gruntConfig',
      'encounter',
      'bookmarks',
      'diceRoller.rolls',
      'characterBuilder.character',
      'user.bookmarks'
    ]
  })(store)
}
