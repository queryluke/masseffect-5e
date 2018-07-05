<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getDataItem'])
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

          const condition = this.getDataItem('conditions', id)
          if (condition === undefined) {
            return text
          }

          return createElement(
            'nuxt-link',
            {
              attrs: { to: `/phb/rules/conditions#${condition.id}` }
            },
            [ display ]
          )
        } else {
          return text
        }
      })
      return createElement('span', renderArray)
    }
  }
</script>


