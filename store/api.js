import { API, Storage } from 'aws-amplify'
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as gqlQueries from '~/graphql/queries'
import * as gqlMutations from '~/graphql/mutations'

// https://github.com/jagr-co/amplify-nuxt/blob/master/03-adding-graphql-api/store/api.js

export const state = () => ({
})

export const getters = {
  authMode: (state, getters, rootState) => rootState.auth.isAuthenticated ? 'AMAZON_COGNITO_USER_POOLS' : 'API_KEY'
}

export const mutations = {
}

export const actions = {
  // API HELPERS
  async QUERY ({ commit, getters }, { query, variables = {}, action = null }) {
    const { data } = await API.graphql({
      query: gqlQueries[query],
      variables,
      authMode: getters.authMode
    })

    const value = data[query]
    if (action) {
      commit(action, value, { root: true })
    }
    return value
  },
  async MUTATE ({ commit, getters }, { mutation, input, action }) {
    const { data } = await API.graphql({
      query: gqlMutations[mutation],
      variables: { input },
      authMode: getters.authMode
    })

    const value = data[mutation]
    if (action) {
      commit(action, value, { root: true })
    }
    return value
  },
  async STORE_IMAGE ({ commit, rootGetters }, { file, qualifier }) {
    const extension = file.name.split('.').pop()
    const username = rootGetters['auth/username']
    if (!username) {
      throw new Error('username not found')
    }
    const fileName = `${username}-${qualifier}.${extension}`
    return await Storage.put(fileName, file, { contentType: file.type })
  },
  async GET_IMAGE ({ commit }, { fileName, action, actionParams }) {
    const response = await Storage.get(fileName)
    const imageData = await this.$http.get(response)
    const blob = await imageData.blob()
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      commit(action, { ...actionParams, value: reader.result }, { root: true })
    }
  }
}
