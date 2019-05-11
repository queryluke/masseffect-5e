const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

/*****
 * Static Files
 */
const fs = require('fs')
const fm = require('front-matter')
const jsonDirs = ['classes', 'bestiary']
const mdDirs = [
  'backgrounds',
  'rules',
  'grenades',
  'tools',
  'conditions',
  'class_features',
  'changelog',
  'races',
  'feats',
  'spells',
  'programs',
  'vehicles'
]
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
      case 'vehicles':
        item.id = file.replace(/.md$/, '')
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
fs.readdirSync('./static/data/bestiary').map(file => {
  const id = file.replace(/.json$/, '')
  routes.push(`/phb/bestiary/${id}`)
})
for (let v of ['backgrounds', 'feats', 'races']) {
  fs.readdirSync(`./static/data/${v}`).map(file => {
    const id = file.replace(/.md$/, '')
    routes.push(`/phb/${v}/${id}`)
  })
}
fs.readdirSync('./static/data/changelog').map((file) => {
  routes.push('/changelog/' + (file.replace(/\.md$/g, '')))
})


module.exports = {
  mode: 'spa',
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

  /*
  ** manifest for nuxt-pwa
  */
  manifest: {
    name: 'Mass Effect 5e',
    lang: 'en'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#b71c1c' },

  /*
  ** Routes
  */
  generate: {
    routes
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    { src: '@/plugins/persistentState.js', ssr: false },
    '@/plugins/filters/index.js',
    '@/plugins/vue2-filters',
    '@/plugins/globals'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
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

  /*
  ** Router Scroll behavior
  */
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
  },
  sitemap: {
    hostname: 'https://n7.world',
    exclude: [
      '/static/data'
    ],
    routes: routes
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Frontmatter loader
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true
        }
      })
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
