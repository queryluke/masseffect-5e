import prod from './nuxt.config.prod'
const version = process.env.VERSION.replace(/\./g, '')
export default {
  ...prod,
  router: {
    base: `/${version}/`
  }
}
