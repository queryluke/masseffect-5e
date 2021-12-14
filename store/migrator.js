export const state = () => ({
  migrated: {
    characters: false,
    bookmarks: false
  }
})

export const getters = {
  isMigrated: state => key => state.migrated[key]
}

export const mutations = {
  SET_MIGRATED (state, key) {
    state.migrated = { ...state.migrated, [key]: true }
  }
}

export const actions = {
  async MIGRATE ({ commit, rootGetters, getters, dispatch }, key) {
    if (getters.isMigrated(key)) {
      return
    }
    try {
      const previousVersion = rootGetters.pastVersions[0].name.replace(/\./g, '')
      const previous = localStorage.getItem(previousVersion)
      if (previous) {
        let previousState
        try {
          previousState = JSON.parse(previous)
        } catch (e) {
          console.log(e)
          return
        }
        switch (key) {
          case 'characters':
            if (previousState.cb?.characters) {
              try {
                dispatch('MIGRATE_CHARACTERS', previousState.cb.characters)
              } catch (e) {
                console.log(e)
              }
              commit('SET_MIGRATED', 'characters')
            }
            break
          case 'bookmarks':
            if (previousState.user?.bookmarks) {
              try {
                await dispatch('MIGRATE_BOOKMARKS', previousState.user.bookmarks)
              } catch (e) {
                console.log(e)
              }
              commit('SET_MIGRATED', 'bookmarks')
            }
            break
          default:
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
  async MIGRATE_BOOKMARKS ({ dispatch, rootGetters }, bookmarks) {
    const bookmarkables = ['armor', 'bestiary', 'gear', 'mods', 'powers', 'vehicles', 'weapons']
    await dispatch('FETCH_LOTS', ['armor', 'bestiary', 'gear', 'mods', 'powers', 'vehicles', 'weapons'], { root: true })
    for (const endpoint of bookmarkables) {
      const bookmarksOfType = bookmarks[endpoint] || []
      for (const bm of bookmarksOfType) {
        // npc generated
        if (endpoint === 'bestiary' && bm.id.startsWith('generated')) {
          dispatch('user/TOGGLE_BOOKMARK', { type: endpoint, item: bm }, { root: true })
        } else {
          const data = rootGetters.getItem(endpoint, bm.id)
          if (data) {
            dispatch('user/TOGGLE_BOOKMARK', { type: endpoint, item: data }, { root: true })
          }
        }
      }
    }
  },
  MIGRATE_CHARACTERS ({ commit }, characters) {
    // TODO: any necessary migrations
  }
}
