import base from './nuxt.config.base'
base.http.baseURL = '/.data/'
export default {
  ...base,
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  watch: ['~/static/.data/*.json', '~/static/.data/messages/*.js']
}
