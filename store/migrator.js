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
  async TEST_MIGRATE ({ dispatch, commit }) {
    const mostRecentBookmarks = {
      bestiary: [],
      weapons: [
        {
          rarity: 'uncommon',
          type: 'shotgun',
          cost: 19000,
          manufacturer: 'batarian',
          weight: 13,
          heat: 2,
          damage: {
            dieCount: 2,
            dieType: 8,
            type: 'piercing'
          },
          range: 5,
          image: 'http://vignette2.wikia.nocookie.net/masseffect/images/3/3f/ME3_Raider_Shotgun.png/revision/latest?cb=20120317200919',
          andromeda: false,
          properties: [
            'double-tap',
            'hip-fire',
            'two-handed',
            'recoil'
          ],
          name: 'AT-12 Raider',
          html: '',
          id: 'at-12-raider'
        }
      ]
    }
    const mostRecentCharacters = null
    const previousVersion = 'v131'
    try {
      await dispatch(previousVersion, { characters: mostRecentCharacters, bookmarks: mostRecentBookmarks })
      commit('SET_MIGRATED', true)
    } catch (e) {
      console.error(e)
    }
  },
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
  async v131 ({ dispatch, commit, rootGetters }, { bookmarks, characters }) {
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
      const newCharacters = []
      for (const character of Object.values(characters)) {
        newCharacters.push(await dispatch('character/migrator/migrate', character, { root: true }))
      }
      commit('characters/SET_LOCAL_CHARACTERS', newCharacters, { root: true })
    }
  }
}
