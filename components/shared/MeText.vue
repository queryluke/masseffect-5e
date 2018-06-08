<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['tooltips'])
    },
    name: 'MeText',
    props: ['text'],
    render (createElement) {
      if (!this.text) {
        return ''
      }
      const renderArray = this.text.split(/(?={)(.*?})/g).map(text => {
        if (text.charAt(0) === '{' && text.substring(text.length - 1) === '}') {
          let id = text.replace(/[{|}]/g, '')
          let display = id
          if (/prime/gi.test(text)) {
            id = 'primed'
            const textArray = text.replace(/[{|}]/g, '').split('-')
            display = `${textArray[0]} (${textArray[1]})`
          }

          const tooltip = this.tooltips.find((tt) => {
            return tt.id === id
          })

          if (tooltip === undefined) {
            return text
          }

          return createElement(
            'v-tooltip',
            {
              props: {
                bottom: true
              }
            },
            [
              createElement('span', {slot: 'activator', attrs: {class: 'primary--text'}}, display),
              createElement('span', tooltip.mechanic)
            ]
          )
        } else {
          return text
        }
      })
      return createElement('span', renderArray)
    }
  }
</script>

