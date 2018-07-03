import _ from 'lodash'
import {mapGetters} from 'vuex'

export const EnhanceMarkdown = {
  computed: {
    ...mapGetters(['getDataItem'])
  },
  methods: {
    enhanceMarkdown (html, model = {}) {
      return html.replace(/<table>/gi, '<table class="table v-table">')
        .replace(/<th>/gi, '<th class="text-xs-left">')
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
