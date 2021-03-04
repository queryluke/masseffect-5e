import axios from 'axios'
import base from './nuxt.config.base'
const baseUrl = `${process.env.API_BASE_URL}/${process.env.VERSION.replace(/\./g, '')}`

export default {
  ...base,
  generate: {
    async routes () {
      const endpoints = ['conditions', 'tool-profs', 'armor', 'backgrounds', 'bestiary', 'changelog', 'classes', 'feats', 'gmg', 'rules', 'powers', 'species', 'weapons']
      const urls = []
      for (const endpoint of endpoints) {
        urls.push(axios.get(`${baseUrl}/${endpoint}.json`))
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
}
