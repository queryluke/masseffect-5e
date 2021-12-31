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
  sub: state => state.isAuthenticated ? state.cognitoUser.attributes.sub : false
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
    console.log('auth?', getters.isAuthenticated)
    if (!getters.isAuthenticated) {
      console.log('loading user')
      try {
        const user = await Auth.currentAuthenticatedUser()
        commit('SET_USER', user)
        await dispatch('user/LOAD_USER_SETTINGS', null, { root: true })
      } catch (error) {
        commit('SET_USER', null)
      }
    }
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
              // all other clean-up
              commit('user/RESET_BOOKMARKS', null, { root: true })
              commit('SET_USER', null)
              commit('SET_LOGOUT_STATE', 0)
              commit('SET_LOGOUT_OVERLAY', false)
            }, 1500)
          }, 3000)
        }, 1000)
      }, 200)
    } catch (e) {
      console.error(e)
    }
  },

  async LOG_IN ({ commit }) {
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
