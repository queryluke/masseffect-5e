import jsonpack from 'jsonpack/main'

export const state = () => ({
  migrated: false
})

export const getters = {
  isMigrated: state => typeof state.migrated !== 'boolean' ? false : state.migrated
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
        commit('SET_MIGRATED', true)
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
        commit('SET_MIGRATED', true)
        return
      }
      try {
        await dispatch(previousVersion, { characters: mostRecentCharacters, bookmarks: mostRecentBookmarks })
        commit('SET_MIGRATED', true)
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
    commit('user/RESET_BOOKMARKS', null, { root: true })
    if (bookmarks) {
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
    if (characters) {
      console.log(characters)
      const newCharacters = {}
      for (const [id, character] of Object.entries(characters)) {
        console.log(id, character)
        if (typeof character.meta === 'undefined') {
          character.meta = {
            remote: false,
            version: '1.0.1'
          }
          character.selected = []
          character.subspecies = null
          character.options = {
            tashas: false
          }
        }
        const newSelections = character.selections.filter(i => !i.source.startsWith('species'))
        character.selections = newSelections
        character.currentStats = { ...character.currentStats, resources: {} }
        newCharacters[id] = character
      }
      commit('cb/SET_CHARACTERS', newCharacters, { root: true })
    }
  }
}
