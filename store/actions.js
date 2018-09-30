const fm = require('front-matter')
const _ = require('lodash')

// const jsonDirs = ['classes']
// const mdDirs = ['backgrounds', 'conditions', 'kits', 'class_features', 'changelog', 'spells']

const jsonDirs = ['classes']
const mdDirs = ['backgrounds', 'rules', 'grenades', 'tools']

export default {
  nuxtServerInit () {
    if (process.server) {
      const fs = require('fs')
      // one time process
      /*
      for (const g of grenades.data) {
        const id = g.id.replace('_', '-')

        let text = `---\nid: ${id}\nname: ${g.name}\ndamage: ${g.damage_amount}${g.dd}\nrange: ${g.range}\nblast: ${g.blast}\ndamageType: ${g.damage_type}\n---`
        for (const line of g.desc) {
          text += `\n${line.data}`
        }

        fs.writeFileSync(`./static/data/grenades/${id}.md`, text)
      }
      */
      // process markdown files
      for (let dir of mdDirs) {
        const path = `./static/data/${dir}`
        const files = fs.readdirSync(path)

        const items = files.filter(elm => elm.match(/.*\.(md)/ig)).map((file) => {
          const fc = fm(fs.readFileSync(`${path}/${file}`, 'utf8'))
          let item = Object.assign(fc.attributes, {})

          if (dir === 'changelog') {
            item.date = new Date(item.date)
            item.slug = file.replace(/.md$/, '')
            item.url = `/changelog/${item.slug}`
          }

          if (dir === 'rules') {
            const fileParts = file.split('-')
            item.section = Number.parseInt(fileParts[0])
            item.subSection = Number.parseInt(fileParts[1])
            item.id = file.replace(/\.md$/g, '')
            item.hash = fileParts.splice(2).join('-').replace(/\.md$/g, '')
          }
          return item
        })
        fs.writeFileSync(`${path}/index.json`, JSON.stringify(items, null, 2))
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
