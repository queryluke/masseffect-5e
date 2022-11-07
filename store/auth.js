import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  cognitoUser: null,
  redirect: null,
  logoutOverlay: false,
  logoutState: 0
})

export const getters = {
  isAuthenticated: state => state.isAuthenticated,
  sub: state => state.isAuthenticated ? state.cognitoUser?.attributes?.sub : false,
  username: state => state.isAuthenticated ? state.cognitoUser?.username : false
}

export const mutations = {
  SET_USER (state, user) {
    state.isAuthenticated = !!user
    state.cognitoUser = user
  },
  SET_LOGOUT_STATE (state, value) {
    state.logoutState = value
  },
  SET_LOGOUT_OVERLAY (state, value) {
    state.logoutOverlay = value
  },
  SET_REDIRECT (state, redirect) {
    state.redirect = redirect
  }
}

export const actions = {
  async LOAD_USER ({ commit, getters, dispatch }) {
    let syncBookmarks = false
    try {
      const user = await Auth.currentAuthenticatedUser()
      if (user && !getters.isAuthenticated) {
        // i.e., user was not logged in, but now they are so we need to load their user settings
        // but need to commit the user first
        syncBookmarks = true
      }
      commit('SET_USER', user)
      await dispatch('user/SYNC_PROFILE', null, { root: true })
    } catch (error) {
      // i.e., user WAS logged in, but now is NOT
      if (getters.isAuthenticated) {
        dispatch('LOGOUT_CLEAN_UP')
      }
      // console.error(error)
      commit('SET_USER', null)
    }
    if (syncBookmarks) {
      try {
        await dispatch('user/SYNC_BOOKMARKS', null, { root: true })
      } catch (e) {
        console.error(e)
      }
    }
    await dispatch('FETCH_HOMEBREW_DATA', null, { root: true })
  },

  LOGOUT_CLEAN_UP ({ commit }) {
    commit('user/RESET_BOOKMARKS', [], { root: true })
    commit('characters/SET_REMOTE_CHARACTERS', [], { root: true })
    commit('character/homebrew/SET_CHARACTER_SPECIFIC_HOMEBREW', [], { root: true })
  },

  LOG_OUT ({ commit, dispatch }) {
    try {
      commit('SET_LOGOUT_STATE', 0)
      commit('SET_LOGOUT_OVERLAY', true)
      const ifrm = document.createElement('iframe')
      ifrm.setAttribute('id', 'logoutIframe')
      setTimeout(() => {
        commit('SET_LOGOUT_STATE', 1)
        const signOutElement = document.getElementById('signOutHack')
        signOutElement.appendChild(ifrm)
        ifrm.setAttribute('src', `${window.location.origin}/auth/logout/`)
        setTimeout(() => {
          commit('SET_LOGOUT_STATE', 2)
          setTimeout(() => {
            commit('SET_LOGOUT_STATE', 3)
            setTimeout(() => {
              const frame = document.getElementById('logoutIframe')
              frame.remove()
              commit('SET_USER', null)
              commit('SET_LOGOUT_STATE', 0)
              commit('SET_LOGOUT_OVERLAY', false)
              // all other clean-up
              dispatch('LOGOUT_CLEAN_UP')
            }, 1500)
          }, 3000)
        }, 1000)
      }, 200)
    } catch (e) {
      console.error(e)
    }
  },

  async LOG_IN ({ commit }, redirect) {
    commit('SET_REDIRECT', redirect)
    try {
      await Auth.federatedSignIn()
    } catch (e) {
      console.error(e)
    }
  },

  async getIdToken () {
    return (await Auth.currentSession()).getIdToken().getJwtToken()
  }
}
