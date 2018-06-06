const fm = require('front-matter')
const postFilenameRegex = /^(\d+-\d+-\d+)-(.*)\.md$/g
let postFilenameParts
const mdDirs = ['posts', 'backgrounds', 'kits']

export default {
  nuxtServerInit () {
    if (process.server) {
      const fs = require('fs')
      for (let dir of mdDirs) {
        const path = `data/${dir}`
        const files = fs.readdirSync(path)
        const items = files.map((file) => {
          const fc = fm(fs.readFileSync(`${path}/${file}`, 'utf8'))
          const item = Object.assign(fc.attributes, {})
          if (dir === 'posts') {
            while ((postFilenameParts = postFilenameRegex.exec(file)) !== null) {
              item.filename = postFilenameParts[0]
              item.created = new Date(postFilenameParts[1])
              item.slug = postFilenameParts[2]
            }
            item.url = `/news/${item.slug}`
          }
          return item
        })
        this.dispatch('instantiateState', { key: dir, items })
      }
      const versions = fs.readdirSync('changelog').map(file => file.replace(/.md$/, ''))
      this.dispatch('instantiateState', { key: 'versions', items: versions })
    }
  },
  instantiateState ({getters, commit}, payload) {
    if (getters.stateKeys.includes(payload.key)) {
      commit('update', payload)
    }
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
