import prod from './nuxt.config.prod'
prod.generate.dir = 'next'
export default {
  ...prod,
  router: {
    base: '/next/'
  }
}
