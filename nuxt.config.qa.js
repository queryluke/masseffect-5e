import base from './nuxt.config.base'
base.generate.dir = 'dist-qa'
export default {
  ...base,
  router: {
    base: '/dist-qa/'
  }
}
