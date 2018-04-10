const fm = require('front-matter')
const filenameRegex = /^(\d+-\d+-\d+)-(.*)\.md$/g
let filenameParts

export default {
  nuxtServerInit () {
    if (process.server) {
      const fs = require('fs')
      const files = fs.readdirSync('posts')
      const posts = files.map((file) => {
        const fc = fm(fs.readFileSync(`posts/${file}`, 'utf8'))
        const post = Object.assign(fc.attributes, {})
        while ((filenameParts = filenameRegex.exec(file)) !== null) {
          post.filename = filenameParts[0]
          post.created = new Date(filenameParts[1])
          post.slug = filenameParts[2]
        }
        post.url = `/news/${post.slug}`
        return post
      })
      this.dispatch('loadPosts', posts)

      const versions = fs.readdirSync('changelog').map(file => file.replace(/.md$/, ''))
      this.dispatch('loadVersions', versions)
    }
  },
  loadPosts ({commit}, posts) {
    commit('updatePosts', posts)
  },
  loadVersions ({commit}, versions) {
    commit('updateVersions', versions)
  },
  addBookmark ({commit}, payload) {
    commit('addBookmark', payload)
  },
  removeBookmark ({state, commit}, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id)
    if (index > -1) {
      commit('removeBookmark', index)
    }
  },
  updateGruntConfig ({commit}, payload) {
    commit('updateGruntConfig', payload)
  },
  showGlobalDialog ({commit}, payload) {
    commit('toggleGlobalDialog', true)
    commit('updateGlobalDialogComponent', payload)
  },
  hideGlobalDialog ({commit}) {
    commit('toggleGlobalDialog', false)
  },
  toggleSidebar ({getters, commit}) {
    commit('toggleSidebar', !getters.sidebar)
  }
}
