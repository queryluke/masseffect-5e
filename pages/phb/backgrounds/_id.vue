<template lang="pug">
  v-container(fluid)
    h2.display-1 {{ background.name }}
    v-card.grey.lighten-3.mt-3
      v-card-text
        markdown-file(:id="$route.params.id" itemType="backgrounds")
</template>

<script>
  export default {
    data () {
      const background = require(`~/static/data/backgrounds/${this.$route.params.id}.md`)
      return {
        background: background.attributes
      }
    },
    head () {
      return {
        title: `${this.background.name} - Backgrounds | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: `${this.background.name} background` }
        ]
      }
    },
    layout: 'phb'
  }
</script>
