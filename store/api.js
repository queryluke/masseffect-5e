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
    console.log('QUERY', { commit, getters, query, variables })
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
    console.log('MUTATE', { commit, getters, mutation, input, action })
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
  async STORE_IMAGE ({ commit, rootGetters }, { file, qualifier, modelType }) {
    const extension = file.name.split('.').pop()
    let fileName = null
    if (modelType) {
      fileName = `${modelType}-${qualifier}.${extension}`
    } else {
      const username = rootGetters['auth/username']
      if (!username) {
        throw new Error('username not found')
      }
      fileName = `${username}-${qualifier}.${extension}`
    }
    return await Storage.put(fileName, file, { contentType: file.type })
  },
  async GET_IMAGE ({ commit }, { fileName, action, actionParams }) {
    const response = await Storage.get(fileName)
    const imageData = await this.$http.get(response)
    const blob = await imageData.blob()
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      if (action) {
        commit(action, { ...actionParams, value: reader.result }, { root: true })
      } else {
        return reader.result
      }
    }
  },
  // Discord Webhook APIs
  DISCORD_POST_ALL ({ dispatch, rootGetters }, payload) {
    const selectedWebhooks = rootGetters['character/character'].options.webhooks
    for (const id in selectedWebhooks) {
      // check if hook exists and send if it does, otherwise remove it from the character
      const webhooks = JSON.parse(rootGetters['user/profile'].webhooks)
      const matchingWebhook = webhooks.find(webhook => webhook.id === id)
      if (matchingWebhook) {
        if (selectedWebhooks[id] === matchingWebhook.link) {
          dispatch('api/DISCORD_POST', { webhook: selectedWebhooks[id], entry: payload }, { root: true })
        } else {
          const mutatedWebhooks = { ...selectedWebhooks }
          mutatedWebhooks[id] = matchingWebhook.link
          dispatch('character/UPDATE_CHARACTER', { attr: 'options.webhooks', value: mutatedWebhooks }, { root: true })
          dispatch('api/DISCORD_POST', { webhook: matchingWebhook.link, entry: payload }, { root: true })
        }
      } else {
        delete selectedWebhooks[id]
        dispatch('character/UPDATE_CHARACTER', { attr: 'options.webhooks', value: selectedWebhooks }, { root: true })
      }
    }
  },
  DISCORD_POST ({ dispatch, rootGetters }, payload) {
    const URL = payload.webhook
    const body = JSON.stringify({
      embeds: [{
        fields: [
          {
            name: payload.entry.source.name || rootGetters['user/profile'].username || 'No Name',
            value: '*' + payload.entry.data.detail + '*'
          },
          {
            name: 'Result: ' + payload.entry.data.total,
            value: '*' + payload.entry.data.notation + ': ' + payload.entry.data.results + ' = ' + payload.entry.data.total + '*'
          }
        ]
      }]
    })
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
  }
}
