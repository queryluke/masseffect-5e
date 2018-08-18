const fm = require('front-matter')
const _ = require('lodash')

const jsonDirs = ['classes']
const mdDirs = ['backgrounds', 'conditions', 'kits', 'class_features', 'changelog', 'spells']

export default {
  nuxtServerInit () {
    if (process.server) {
      const fs = require('fs')
      // process markdown files
      for (let dir of mdDirs) {
        const path = `data/${dir}`
        const files = fs.readdirSync(path)

        const items = files.map((file) => {
          const fc = fm(fs.readFileSync(`${path}/${file}`, 'utf8'))
          let item = Object.assign(fc.attributes, {})

          if (dir === 'changelog') {
            item.date = new Date(item.date)
            item.slug = file.replace(/.md$/, '')
            item.url = `/changelog/${item.slug}`
          }
          return item
        })
        const key = dir === 'changelog' ? 'versions' : _.camelCase(dir)
        this.dispatch('instantiateState', { key: key, items })
      }

      // process jsDirs
      for (let dir of jsonDirs) {
        const path = `data/${dir}`
        const files = fs.readdirSync(path)
        const items = files.map(file => JSON.parse(fs.readFileSync(`${path}/${file}`, 'utf8')))
        this.dispatch('instantiateState', { key: _.camelCase(dir), items })
      }
    }
  },
  addBookmark ({commit}, payload) {
    commit('addBookmark', payload)
  },
  instantiateState ({getters, commit}, payload) {
    if (getters.stateKeys.includes(payload.key)) {
      commit('update', payload)
    }
  },
  removeBookmark ({state, commit}, payload) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.type === payload.type && bookmark.card.id === payload.card.id)
    if (index > -1) {
      commit('removeBookmark', index)
    }
  },
  toggleSidebar ({getters, commit}) {
    commit('toggleSidebar', !getters.sidebar)
  },
  updateGruntConfig ({commit}, payload) {
    commit('updateGruntConfig', payload)
  }
}
