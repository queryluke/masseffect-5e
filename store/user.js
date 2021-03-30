export const state = () => ({
  darkMode: true,
  imperial: false,
  bookmarks: {},
  search: null
})

export const getters = {
  darkMode: state => state.darkMode,
  imperial: state => state.imperial,
  bookmarkCount: (state) => {
    let count = 0
    for (const key in state.bookmarks) {
      count += state.bookmarks[key].length
    }
    return count
  },
  bookmarkBagExists: state => type => typeof state.bookmarks[type] !== 'undefined',
  bookmarks: state => state.bookmarks,
  isBookmarked: (state, getters) => (type, item) => {
    if (!getters.bookmarkBagExists(type)) {
      return false
    }
    return typeof state.bookmarks[type].find(i => i.id === item.id) !== 'undefined'
  },
  search: state => state.search
}

export const mutations = {
  SET_DARK_MODE (state, value) {
    state.darkMode = value
  },
  SET_IMPERIAL (state, value) {
    state.imperial = value
  },
  CREATE_BOOKMARK_BAG (state, type) {
    state.bookmarks = { ...state.bookmarks, [type]: [] }
  },
  ADD_BOOKMARK (state, { type, item }) {
    state.bookmarks[type].push(item)
  },
  REMOVE_BOOKMARK (state, { type, item }) {
    const index = state.bookmarks[type].findIndex(i => i.id === item.id)
    if (index > -1) {
      state.bookmarks[type].splice(index)
    }
  },
  SET_SEARCH (state, value) {
    state.search = value
  },
  // TODO: temp
  RESET_BOOKMARKS (state, value) {
    state.bookmarks = { ...value }
  }
}

export const actions = {
  TOGGLE_BOOKMARK ({ getters, commit }, { type, item }) {
    if (getters.isBookmarked(type, item)) {
      commit('REMOVE_BOOKMARK', { type, item })
    } else {
      if (!getters.bookmarkBagExists(type)) {
        commit('CREATE_BOOKMARK_BAG', type)
      }
      commit('ADD_BOOKMARK', { type, item })
    }
  },
  TOGGLE_DARK_MODE ({ getters, commit, dispatch }) {
    const isDark = !getters.darkMode
    commit('SET_DARK_MODE', isDark)
    dispatch('tabbedPage/SET_THEME_MODE', isDark, { root: true })
  },
  // TODO: temp
  REMOVE_BOOKMARK_KEY ({ getters, commit }, key) {
    const bookmarks = { ...getters.bookmarks }
    delete bookmarks[key]
    commit('RESET_BOOKMARKS', bookmarks)
  }
}
