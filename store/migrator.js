import jsonpack from 'jsonpack/main'

export const state = () => ({
  migrated: false
})

export const getters = {
  isMigrated: state => state.migrated
}

export const mutations = {
  SET_MIGRATED (state, value) {
    state.migrated = value
  }
}

export const actions = {
  async MIGRATE ({ commit, rootGetters, getters, dispatch }) {
    if (getters.isMigrated) {
      return
    }
    try {
      let previous = null
      let previousVersion = null
      for (const version of rootGetters.pastVersions) {
        if (previous) {
          continue
        }
        previousVersion = version.name.replace(/\./g, '')
        previous = localStorage.getItem(previousVersion)
      }
      if (!previous) {
        commit('SET_MIGRATED')
        return
      }
      let previousState
      try {
        previousState = JSON.parse(previous)
      } catch (e) {
        console.error(e)
        return
      }
      const mostRecentBookmarks = previousState.user?.bookmarks
      const mostRecentCharacters = previousState.cb?.characters
      if (!mostRecentBookmarks && !mostRecentCharacters) {
        commit('SET_MIGRATED')
        return
      }
      try {
        await dispatch(previousVersion, { characters: mostRecentCharacters, bookmarks: mostRecentBookmarks })
        commit('SET_MIGRATED')
      } catch (e) {
        console.error(e)
      }
    } catch (e) {
      console.error(e)
    }
  },
  async v130 ({ dispatch, rootGetters, commit }, { bookmarks, characters }) {
    if (bookmarks) {
      await dispatch('v131', { bookmarks, characters })
    }
  },
  v131 ({ dispatch, commit, rootGetters }, { bookmarks, characters }) {
    if (bookmarks) {
      commit('user/RESET_BOOKMARKS', null, { root: true })
      const bookmarkables = ['armor', 'bestiary', 'gear', 'mods', 'powers', 'vehicles', 'weapons']
      for (const type of bookmarkables) {
        const bookmarksOfType = bookmarks[type] || []
        for (const bm of bookmarksOfType) {
          if (type === 'bestiary' && bm.id.startsWith('generated')) {
            // pack the json
            const data = jsonpack.pack(bm)
            commit('user/ADD_BOOKMARK', { model: 'genpc', modelId: bm.id, data }, { root: true })
          } else {
            const newType = type === 'vehicle' ? 'vehicles' : type
            commit('user/ADD_BOOKMARK', { model: newType, modelId: bm.id }, { root: true })
          }
        }
      }
    }
  }
}
