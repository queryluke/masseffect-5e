import jsonpack from 'jsonpack/main'

export const state = () => ({
  darkMode: true,
  imperial: false,
  bookmarks: [],
  username: null,
  avatar: null,
  profileImg: null,
  maxCharacters: 50,
  search: null,
  syncStatus: 'saved'
})

export const getters = {
  avatar: state => state.avatar,
  profile: (state, getters, rootState, rootGetters) => {
    return {
      id: rootGetters['auth/username'],
      darkMode: state.darkMode,
      imperial: state.imperial,
      username: state.username,
      profileImg: state.profileImg
    }
  },
  darkMode: state => state.darkMode,
  imperial: state => state.imperial,
  bookmarkCount: (state, getters) => getters.bookmarks.length,
  bookmarks: state => state.bookmarks,
  isBookmarked: (state, getters) => (model, id) => {
    const lookupModel = model === 'bestiary' && id.startsWith('generated') ? 'genpc' : model
    return typeof getters.bookmarks.find(i => i.modelId === id && i.model === lookupModel) !== 'undefined'
  },
  maxCharacters: state => state.maxCharacters,
  search: state => state.search,
  syncStatus: state => state.syncStatus
}

export const mutations = {
  SET_USER_SETTINGS (state, value) {
    if (!value) {
      return
    }
    for (const key of ['username', 'darkMode', 'imperial', 'profileImg', 'maxCharacters']) {
      if (value[key] || value[key] === false) {
        state[key] = value[key]
      }
    }
  },
  SET_AVATAR (state, { value }) {
    state.avatar = value
  },
  SET_DARK_MODE (state, value) {
    state.darkMode = value
  },
  SET_IMPERIAL (state, value) {
    state.imperial = value
  },
  ADD_BOOKMARK (state, bookmark) {
    state.bookmarks.push(bookmark)
  },
  REMOVE_BOOKMARK (state, { model, modelId }) {
    const index = state.bookmarks.findIndex(i => i.modelId === modelId && i.model === model)
    if (index > -1) {
      state.bookmarks.splice(index, 1)
    }
  },
  SET_SEARCH (state, value) {
    state.search = value
  },
  // TODO: temp
  RESET_BOOKMARKS (state) {
    state.bookmarks = []
  },
  SET_SYNC_STATUS (state, value) {
    state.syncStatus = value
  }
}

export const actions = {
  async SET_IMPERIAL ({ commit, dispatch }, value) {
    commit('SET_IMPERIAL', value)
    await dispatch('UPDATE_PROFILE')
  },
  async ADD_BOOKMARK ({ dispatch, commit, getters, rootGetters }, { type, item }) {
    const data = (type === 'genpc' || item.homebrew) ? jsonpack.pack(JSON.stringify(item)) : null
    const modelId = item.id
    if (getters.isBookmarked(type, modelId)) {
      return
    }
    if (rootGetters['auth/isAuthenticated']) {
      const bookmark = await dispatch('api/MUTATE', { mutation: 'createBookmark', input: { owner: getters.profile.id, model: type, modelId, data } }, { root: true })
      commit('ADD_BOOKMARK', bookmark)
    } else {
      commit('ADD_BOOKMARK', { model: type, data, modelId })
    }
  },
  async REMOVE_BOOKMARK ({ dispatch, commit, rootGetters, getters }, { type, item }) {
    // TODO: at this point, data is also the model, so if authenticated need to read current bookmarks to get aws id
    const lookupType = type === 'bestiary' && item.id.startsWith('generated') ? 'genpc' : type
    if (rootGetters['auth/isAuthenticated']) {
      const bookmark = getters.bookmarks.find(i => i.modelId === item.id && i.model === lookupType)
      if (bookmark) {
        await dispatch('api/MUTATE', { mutation: 'deleteBookmark', input: { id: bookmark.id } }, { root: true })
      }
    }
    commit('REMOVE_BOOKMARK', { model: lookupType, modelId: item.id })
  },
  async TOGGLE_BOOKMARK ({ getters, commit, rootGetters, dispatch }, { type, item }) {
    if (getters.isBookmarked(type, item.id)) {
      await dispatch('REMOVE_BOOKMARK', { type, item })
    } else {
      await dispatch('ADD_BOOKMARK', { type, item })
    }
  },
  async SYNC_PROFILE ({ getters, dispatch, commit }) {
    const profile = getters.profile
    const user = await dispatch('api/QUERY', { query: 'getProfile', variables: { id: profile.id } }, { root: true })
    if (user) {
      commit('SET_USER_SETTINGS', user)
      if (user.profileImg && getters.avatar === null) {
        try {
          await dispatch('api/GET_IMAGE', { fileName: user.profileImg, action: 'user/SET_AVATAR' }, { root: true })
        } catch (e) {
          commit('SET_AVATAR', false)
          console.error('could not find user image')
        }
      }
    } else {
      await dispatch('api/MUTATE', { mutation: 'createProfile', input: profile }, { root: true })
    }
  },
  async SYNC_BOOKMARKS ({ getters, dispatch, commit }) {
    // GET bookmarks from AWS
    let nextToken = null
    const remoteBookmarks = []
    do {
      const response = await dispatch('api/QUERY', { query: 'bookmarkByUser', variables: { owner: getters.profile.id, limit: 100, nextToken } }, { root: true })
      nextToken = response.nextToken
      remoteBookmarks.push(...response.items)
    } while (nextToken !== null)
    // GET bookmarks from localStorage
    const localBookmarks = getters.bookmarks.slice()
    // create lookups
    const remoteLookup = remoteBookmarks.map(i => `${i.model}-${i.modelId}`)
    const localLookup = localBookmarks.map(i => `${i.model}-${i.modelId}`)
    // create sync categories
    const localOnly = localBookmarks.filter(i => !remoteLookup.includes(`${i.model}-${i.modelId}`))
    const remoteOnly = remoteBookmarks.filter(i => !localLookup.includes(`${i.model}-${i.modelId}`))
    const localAndRemote = remoteBookmarks.filter(i => localLookup.includes(`${i.model}-${i.modelId}`))
    for (const lob of localOnly) {
      if (lob.id) {
        continue
      }
      commit('REMOVE_BOOKMARK', lob)
      const response = await dispatch('api/MUTATE', { mutation: 'createBookmark', input: { owner: getters.profile.id, model: lob.model, modelId: lob.modelId, data: lob.data } }, { root: true })
      commit('ADD_BOOKMARK', response)
    }
    for (const rob of remoteOnly) {
      commit('ADD_BOOKMARK', rob)
    }
    for (const larb of localAndRemote) {
      commit('REMOVE_BOOKMARK', larb)
      commit('ADD_BOOKMARK', larb)
    }
  },
  async TOGGLE_DARK_MODE ({ getters, commit, dispatch }) {
    const isDark = !getters.darkMode
    commit('SET_DARK_MODE', isDark)
    dispatch('tabbedPage/SET_THEME_MODE', isDark, { root: true })
    await dispatch('UPDATE_PROFILE')
  },
  async UPDATE_PROFILE ({ dispatch, getters, rootGetters }, update = false) {
    if (rootGetters['auth/isAuthenticated']) {
      await dispatch('api/MUTATE', { mutation: 'updateProfile', input: getters.profile }, { root: true })
      if (update) {
        await dispatch('SYNC_PROFILE')
      }
    }
  },
  // TODO: temp
  REMOVE_BOOKMARK_KEY ({ getters, commit }, key) {
    const bookmarks = { ...getters.bookmarks }
    delete bookmarks[key]
    commit('RESET_BOOKMARKS', bookmarks)
  }
}
