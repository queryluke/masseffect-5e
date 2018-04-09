// Dynamic Route generation
const classes = require('./data/classes.json')
const races = require('./data/races.json')
const routes = []
for (const c of classes.data) {
  routes.push(`/phb/classes/${c.id}`)
  routes.push(`/print/spell-cards/${c.id}`)
}
for (const r of races.data) {
  routes.push(`/phb/races/${r.id}`)
}

module.exports = {
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
  plugins: [
    '~/plugins/vuetify.js',
    { src: '~/plugins/persistentState.js', ssr: false },
    '~/plugins/filters/index.js',
    '~/plugins/vue2-filters'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#b71c1c' },
  /*
  ** Modules
  */
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-83740704-2'
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
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
