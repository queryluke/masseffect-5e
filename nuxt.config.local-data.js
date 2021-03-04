import base from './nuxt.config.base'
base.http.baseURL = '/.data/'
export default {
  ...base,
  watch: ['~/static/.data/*.json']
}
