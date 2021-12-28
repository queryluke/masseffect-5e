import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  cognitoUser: null,
  redirect: null
})

export const getters = {
  sub: state => state.isAuthenticated ? state.cognitoUser.attributes.sub : false
}

export const mutations = {
  SET_USER (state, user) {
    state.isAuthenticated = !!user
    state.cognitoUser = user
  },
  SET_REDIRECT (state, redirect) {
    state.redirect = redirect
  }
}

export const actions = {
  async LOAD_USER ({ commit, state, dispatch }) {
    if (!state.isAuthenticated) {
      try {
        const user = await Auth.currentAuthenticatedUser()
        commit('SET_USER', user)
        dispatch('user/LOAD_USER_SETTINGS', null, { root: true })
      } catch (error) {
        commit('SET_USER', null)
      }
    }
  },

  async LOG_OUT ({ commit }) {
    await Auth.signOut()
    commit('SET_USER', null)
  },

  async getIdToken () {
    return (await Auth.currentSession()).getIdToken().getJwtToken()
  }
}
