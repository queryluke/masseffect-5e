<template lang="pug">
  v-card.search-result
    v-btn(small fab flat absolute right @click="showFull = !showFull").mt-3
      v-icon {{ showIcon }}
    v-card-text(@click="showFull = !showFull")
      div.headline {{ doc.title }}
      div.body-2
        span.text-uppercase {{ doc.type }}
        span.ml-3 {{ doc.subType | titlecase }}
      div(v-html="rendered").mt-3

</template>

<script>
  const md = require('markdown-it')({
    html: true
  })

  export default {
    name: 'SearchResult',
    props: {
      doc: {
        type: Object,
        default: () => {}
      },
      result: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        typeColors: {
          character: '',
          equipment: '',
          rule: '',
          spell: '',
          bestiary: ''
        },
        showFull: false
      }
    },
    computed: {
      rendered () {
        return md.render(this.description)
      },
      description () {
        return this.showFull ? this.doc.body : this.$options.filters.truncate(this.doc.body, 156)
      },
      showIcon () {
        return this.showFull ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
      }
    }
  }
</script>

<style>
  .search-result p {
    margin-bottom: .5em;
  }
</style>

