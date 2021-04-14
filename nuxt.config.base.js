import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
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
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org/usage
    'nuxt-i18n',
    '@nuxt/http'
  ],
  googleAnalytics: {
    id: 'UA-83740704-2'
  },
  /*
  ** i18n
  ** See https://i18n.nuxtjs.org/options-reference
  */
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'loader.js'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'loader.js'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: true
    },
    vueI18n: {
      fallbackLocale: 'en'
    }
  },
  /*
  ** http module configuration
  ** Doc: https://http.nuxtjs.org/usage
  */
  http: {
    baseURL: `${process.env.API_BASE_URL}/${process.env.VERSION.replace(/\./g, '')}`
    // baseURL: '/.me5e/'
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
    transpile: ['vuetify/lib'],
    //
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*'
      }
    }
  },
  publicRuntimeConfig: {
    version: process.env.VERSION
  }
}
