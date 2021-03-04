import prod from './nuxt.config.prod'
prod.generate.dir = 'dist-qa'
export default {
  ...prod,
  router: {
    base: '/dist-qa/'
  }
}
