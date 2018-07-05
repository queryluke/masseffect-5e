import _ from 'lodash'
import {mapGetters} from 'vuex'

export const EnhanceMarkdown = {
  computed: {
    ...mapGetters(['getDataItem'])
  },
  methods: {
    enhanceMarkdown (html, model = {}) {
      return html.replace(/<table>([\s\S]*?)<\/table>/gi, (match, capture) => {
        const headerKeys = capture.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>/)[1]
          .split('</th>').map(k => k.replace(/(\W|th)/g, '')).filter(String)
        const rowCount = (capture.match(/<tr>/g) || []).length
        let i = 0
        const fullWidth = ['Explosion']
        do {
          for (let j = 0; j < headerKeys.length; j++) {
            const replacement = fullWidth.includes(headerKeys[j])
              ? `<td data-table-key="${headerKeys[j]}" class="full-width-td">`
              : `<td data-table-key="${headerKeys[j]}">`
            capture = capture.replace('<td>', replacement)
          }
          i++
        } while (i < rowCount)
        return `<table class="table mb-3">${capture}</table>`
      })
        .replace(/<ul>/gi, '<ul style="background-color: transparent">')
        .replace(/{{2}(.*?)}{2}/g, (match, capture) => {
          const key = capture.trim()
          if (key.indexOf('=') > -1) {
            const [abbrType, abbrKey] = key.split('=').map(k => k.trim())
            switch (abbrType) {
              case 'plural':
                const [string, key] = abbrKey.split('|')
                return this.$options.filters.pluralize(_.get(model, key), string)
              case 'condition':
                const condition = this.getDataItem('conditions', abbrKey)
                return `<a href="/phb/rules/conditions#${condition.uid}">${condition.name}</abbr>`
              default:
                return ''
            }
          }
          switch (key) {
            case 'newSpellLevelMax':
            case 'level':
              return this.$options.filters.ordinal(_.get(model, key))
            default:
              return _.get(model, key)
          }
        })
    }
  }
}
