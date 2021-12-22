import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  cognitoUser: null,
  redirect: null
})

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
  async LOAD_USER ({ commit, state }) {
    if (!state.isAuthenticated) {
      try {
        const user = await Auth.currentAuthenticatedUser()
        commit('SET_USER', user)
      } catch (error) {
        commit('SET_USER', null)
      }
    }
  },

  async ATTRIBUTES () {
    const { attributes } = await Auth.currentAuthenticatedUser()
    return attributes
  },

  async LOG_OUT ({ commit }) {
    await Auth.signOut()
    commit('SET_USER', null)
  },

  async getIdToken () {
    return (await Auth.currentSession()).getIdToken().getJwtToken()
  }
}
