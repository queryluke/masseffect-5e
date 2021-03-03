import colors from 'vuetify/es5/util/colors'
// import axios from 'axios'

export default {
  ssr: true,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + 'Mass Effect 5e',
    title: 'Mass Effect 5e' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'mass effect, d&d, dnd, Dungeons & Dragons, 5e, 5th Edition, TRPG, RPG, d20, homebrew, conversion, tabletop' },
      { hid: 'description', name: 'description', content: 'D&D 5th Edition Homebrew featuring the Mass Effect Universe' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#b71c1c' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/persistentState.js', ssr: false },
    { src: '@/plugins/TiptapVuetify', mode: 'client' },
    '@/plugins/filters/index.js',
    '@/plugins/vue2-filters',
    '@/plugins/globals'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  googleAnalytics: {
    id: 'UA-83740704-2'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://raw.githubusercontent.com/queryluke/masseffect-5e-data/master/.me5e/'
    // baseURL: '/.me5e/'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: {
      components: ['VSimpleTable', 'VAlert', 'VCard', 'VCardText', 'VChip', 'VImg', 'VIcon']
    },
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.indigo.darken4,
          accent: colors.lightBlue.darken1,
          secondary: colors.red.darken4,
          info: colors.lightBlue.darken3,
          warning: colors.amber.lighten1,
          error: colors.pink.lighten1,
          success: colors.lightGreen.lighten1
        },
        dark: {
          primary: colors.lightBlue.darken1,
          accent: colors.indigo.darken4,
          secondary: colors.red.darken4,
          info: colors.lightBlue.darken3,
          warning: colors.amber.lighten1,
          error: colors.pink.lighten1,
          success: colors.lightGreen.lighten1
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify']
  },
  /*
  ** PWA
  ** See https://pwa.nuxtjs.org/
  */
  pwa: {
    manifest: {
      name: 'Mass Effect 5e',
      lang: 'en',
      theme_color: colors.red.darken4,
      short_name: 'Mass Effect 5e'
    }
  }
  /*
  generate: {
    async routes () {
      const endpoints = ['conditions', 'tool-profs', 'armor', 'backgrounds', 'bestiary', 'changelog', 'classes', 'feats', 'gmg', 'rules', 'powers', 'species', 'weapons']
      const urls = []
      for (const endpoint of endpoints) {
        urls.push(axios.get(`https://raw.githubusercontent.com/queryluke/masseffect-5e-data/master/.me5e/${endpoint}.json`))
      }
      const data = await Promise.all(urls)
      const routes = []
      for (let i = 0; i < data.length; i++) {
        const endpoint = endpoints[i]
        const path = ['conditions', 'tool-profs'].includes(endpoint) ? `appendix/${endpoint}` : endpoint
        if (['rules', 'gmg'].includes(endpoint)) {
          const pages = [...new Set(data[i].data.map(j => j.section))]
          for (const page of pages) {
            const rPath = endpoint === 'rules' ? 'manual' : 'guide'
            routes.push(`/${rPath}/${page}`)
          }
        } else {
          for (const obj of data[i].data) {
            routes.push(`/${path}/${obj.id}`)
          }
        }
      }
      return routes
    }
  }
  */
}
