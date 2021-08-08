import axios from 'axios'
import base from './nuxt.config.base'
const baseUrl = `${process.env.API_BASE_URL}/${process.env.VERSION.replace(/\./g, '')}`

export default {
  ...base,
  generate: {
    async routes () {
      const endpoints = ['conditions', 'tool-profs', 'armor', 'backgrounds', 'bestiary', 'changelog', 'classes', 'feats', 'guides-index', 'manual-index', 'powers', 'species', 'weapons']
      const urls = []
      for (const endpoint of endpoints) {
        // TODO: need to do this for every lang
        urls.push(axios.get(`${baseUrl}/en/${endpoint}.json`))
      }
      const data = await Promise.all(urls)
      const routes = []
      for (let i = 0; i < data.length; i++) {
        const endpoint = endpoints[i]
        const path = ['conditions', 'tool-profs'].includes(endpoint) ? `appendix/${endpoint}` : endpoint
        if (['manual-index', 'guides-index'].includes(endpoint)) {
          const pages = [...new Set(data[i].data.map(j => j.id))]
          for (const page of pages) {
            const rPath = endpoint === 'manual-index' ? 'manual' : 'guide'
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
}
