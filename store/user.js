export const state = () => ({
  darkMode: true,
  imperial: false,
  bookmarks: {}
})

export const getters = {
  darkMode: state => state.darkMode,
  imperial: state => state.imperial,
  bookmarkBagExists: state => type => typeof state.bookmarks[type] !== 'undefined',
  isBookmarked: (state, getters) => (type, item) => {
    if (!getters.bookmarkBagExists(type)) {
      return false
    }
    return typeof state.bookmarks[type].find(i => i.id === item.id) !== 'undefined'
  }
}

export const mutations = {
  TOGGLE_DARK_MODE (state) {
    state.darkMode = !state.darkMode
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
  }
}
