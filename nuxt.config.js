// Dynamic Route generation
const routes = []
require('./data/classes.json').data.map(c => {
  routes.push(`/phb/classes/${c.id}`)
  routes.push(`/print/spell-cards/${c.id}`)
})
require('./data/races.json').data.map(r => routes.push(`/phb/races/${r.id}`))

require('fs').readdirSync('./data/posts').map((file) => {
  routes.push('/news/' + (file.replace(/^(\d+-\d+-\d+)-|(\.md$)/g, '')))
})

module.exports = {
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
    '@nuxtjs/markdownit',
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
  markdownit: {
    preset: 'default',
    linkify: true,
    use: [
      'markdown-it-meta'
    ]
  },
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
