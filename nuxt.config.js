const fs = require('fs')
const fm = require('front-matter')
const jsonDirs = ['classes', 'bestiary']
const mdDirs = ['backgrounds', 'rules', 'grenades', 'tools', 'conditions', 'class_features', 'changelog', 'races', 'feats', 'spells']

/*****
 * Static file generation
 */

// const monsters = require('./data/bestiary.json')
// const feats = require('./data/monster_features.json')
// const featIds = feats.data.map(f => f.id)
//
// // one time process
// for (const monster of monsters.data) {
//   const stuff = feats.data.filter(f => monster.featuresActionsReactions.includes(f.id))
//   const weapons = monster.featuresActionsReactions.filter(f => !featIds.includes(f))
//   for (const w of weapons) {
//     monster.actions.push({type: 'weapon', id: w})
//   }
//
//   /*
//   Example die rolls
//   [
//     {type: 'attack', hit: 4, damage: "1d6"},
//     {type: 'attack', hit: 4, damage: "1d6 + 4"},
//     {type: 'attack', hit: 4, damage: "1d6 + 4 + 3d7"},
//     {type: 'saving-throw', dc: 17, ability: 'constitution', damage: "3d4", halfDamage: true}
//   ]
//   */
//   for (const s of stuff) {
//     switch (s.type) {
//       case 'reaction': {
//         monster.reactions.push(
//           {
//             name: s.name,
//             recharge: s.recharge,
//             description: s.description.replace('[name]', monster.name.toLowerCase()).trim()
//           }
//         )
//         break
//       }
//       case 'legendary': {
//         monster.legendaryActions.push(
//           {
//             name: s.name,
//             cost: s.recharge ? parseInt(s.recharge.replace(/\D/g, ''), 10) : 1,
//             description: s.description.replace(/\[name]/g, monster.name.toLowerCase()).replace(/\[dc]/g, monster.dc).trim()
//           }
//         )
//         break
//       }
//       case 'lair': {
//         monster.lairActions.push(
//           {
//             name: s.name,
//             description: s.description.replace(/\[name]/g, monster.name.toLowerCase()).replace(/\[dc]/g, monster.dc).trim()
//           }
//         )
//         break
//       }
//       case 'feature': {
//         monster.features.push(
//           {
//             name: s.name,
//             recharge: s.recharge,
//             description: s.description.replace(/\[name]/g, monster.name.toLowerCase()).replace(/\[dc]/g, monster.dc).trim()
//           }
//         )
//         break
//       }
//       case 'action': {
//         monster.actions.push(
//           {
//             type: 'standard',
//             name: s.name,
//             recharge: s.recharge,
//             description: s.description.replace(/\[name]/g, monster.name.toLowerCase()).replace(/\[dc]/g, monster.dc).trim()
//           }
//         )
//         break
//       }
//       default: {
//         let score = monster.abilityScores[s.attackMod]
//         score = score >= 10 ? Math.floor((score - 10) / 2) : Math.ceil((score - 10) / 2)
//         const toHit = score + parseInt(monster.profBonus, 10)
//         monster.actions.push(
//           {
//             type: s.type,
//             name: s.name,
//             range: parseInt(s.range, 10),
//             target: s.numberOfTargets,
//             hit: s.description.replace(/\[name]/g, monster.name.toLowerCase()).replace(/\[dc]/g, monster.dc).trim(),
//             miss: s.miss,
//             attackMod: toHit
//           }
//         )
//         break
//       }
//     }
//   }
//   delete monster.featuresActionsReactions
//   delete monster.xp
//   delete monster.dc
//   if (monster.techcasting) {
//     monster.spellcasting = monster.techcasting
//   }
//   delete monster.techcasting
//   monster.hp = {
//     numDice: parseInt(monster.hp.numDice),
//     die: parseInt(monster.hp.die, 10),
//   }
//   monster.senses = monster.senses.map(s => {
//     const pieces = s.trim().split(' ')
//     return {sense: pieces[0], range: parseInt(pieces[1].replace(/\D/g, ''))}
//   })
//   monster.profBonus = parseInt(monster.profBonus)
//   if (monster.speed) {
//     monster.speed = monster.speed.split(',').map(s => {
//       const pieces = s.trim().split(' ')
//       const type = pieces[1] ? pieces[0] : 'walk'
//       let range = pieces[1] ? pieces[1] : pieces[0]
//       range = parseInt(range.replace(/\D/g, ''))
//       return {type, range}
//     })
//   } else {
//     monster.speed = [{type: 'stationary', range: 0}]
//   }
//   const ordered = {}
//   Object.keys(monster).sort().forEach((key) => { ordered[key] = monster[key] })
//   fs.writeFileSync(`./static/data/bestiary/${monster.id}.json`, JSON.stringify(ordered, null, 2))
// }

for (let dir of mdDirs) {
  const path = `./static/data/${dir}`
  const files = fs.readdirSync(path)

  const items = files.map((file) => {
    const fc = fm(fs.readFileSync(`${path}/${file}`, 'utf8'))
    let item = Object.assign(fc.attributes, {})
    switch (dir) {
      case 'changelog':
        item.date = new Date(item.date)
        item.slug = file.replace(/.md$/, '')
        item.url = `/changelog/${item.slug}`
        break
      case 'rules':
        const fileParts = file.split('-')
        item.section = Number.parseInt(fileParts[0])
        item.subSection = Number.parseInt(fileParts[1])
        item.id = file.replace(/\.md$/g, '')
        item.hash = fileParts.splice(2).join('-').replace(/\.md$/g, '')
        break
      default:
        break
    }
    return item
  })

  switch (dir) {
    case 'changelog':
      items.reverse()
      break
    default:
      break
  }
  fs.writeFileSync(`${path}.json`, JSON.stringify(items, null, 2))
}

// process jsDirs
for (let dir of jsonDirs) {
  const path = `./static/data/${dir}`
  const files = fs.readdirSync(path)
  let items = files.map(file => JSON.parse(fs.readFileSync(`${path}/${file}`, 'utf8')))
  fs.writeFileSync(`${path}.json`, JSON.stringify(items, null, 2))
}

/*****
 * Dynamic Route Generation
 */
const routes = []
fs.readdirSync('./static/data/classes').map(file => {
  const id = file.replace(/.json$/, '')
  routes.push(`/phb/classes/${id}`)
  routes.push(`/print/spell-cards/${id}`)
})
// require('./data/races.json').data.map(r => routes.push(`/phb/races/${r.id}`))

fs.readdirSync('./static/data/changelog').map((file) => {
  routes.push('/changelog/' + (file.replace(/\.md$/g, '')))
})

module.exports = {
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    extend (config, ctx) {
      /*
      ** Frontmatter loader
      */
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true
        }
      })
      /*
      ** Dev Only
      */
      if (ctx.isDev && ctx.isClient) {
        /*
        ** Run ESLint on save
        */
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '~/assets/style/app.styl'
  ],
  debug: true,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mass Effect 5e',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'mass effect, d&d, dnd, Dungeons & Dragons, 5e, 5th Edition, TRPG, RPG, d20, homebrew, conversion, tabletop' },
      { hid: 'description', name: 'description', content: 'D&D 5th Edition Homebrew featuring the Mass Effect Universe' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  generate: {
    routes
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#b71c1c' },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/google-analytics'
  ],
  'google-analytics': {
    id: 'UA-83740704-2',
    autoTracking: {
      pageviewTemplate: route => {
        return {
          page: route.path,
          title: document.title,
          location: window.location.href
        }
      }
    }
  },
  plugins: [
    '~/plugins/vuetify.js',
    { src: '~/plugins/persistentState.js', ssr: false },
    '~/plugins/filters/index.js',
    '~/plugins/vue2-filters',
    '~/plugins/globals'
  ],
  router: {
    scrollBehavior: (to, from, savedPosition) => {
      let position = false

      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 }
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }
      }

      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
            // scroll to anchor by returning the selector
            position = { selector: to.hash, offset: { x: 0, y: 56 } }
          }
          resolve(position)
        })
      })
    }
  }
}
