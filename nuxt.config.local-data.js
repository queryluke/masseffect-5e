import base from './nuxt.config.base'
base.http.baseURL = '/.data/en'
export default {
  ...base
  //watch: ['~/static/.data/*.json']
}
