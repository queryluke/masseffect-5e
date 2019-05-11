<template lang="pug">
  v-card.search-result
    v-btn(small fab flat absolute right @click="showFull = !showFull").mt-3
      v-icon {{ showIcon }}
    v-card-title.pb-0
      div.headline {{ doc.title }}
      div.body-2
        span(:class="typeColors[doc.type]").text-uppercase {{ doc.subType || doc.type }}
        span(v-if="doc.subType").pl-1.body-1 - {{ doc.subType | titlecase }}
        span(v-if="doc.qualifiers.length > 0").pl-1.body-1 ({{ doc.qualifiers.join(', ') }})
    v-card-text(@click="showFull = !showFull")
      div(v-html="rendered")

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
          character: 'light-green--text text--darken-4',
          equipment: 'deep-orange--text text--darken-4',
          rule: 'secondary--text',
          spell: 'purple--text',
          bestiary: 'primary--text'
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
  .search-result .v-card__title {
    display: block;
  }
  .search-result a {
    text-decoration: none;
  }
  .search-result a:hover, .search-result a:focus  {
    text-decoration: underline;
  }
</style>

