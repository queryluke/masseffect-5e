<template lang="pug">
  v-container(fluid)
    h2.display-1 {{ item.name }}
    v-card.mt-3
      v-card-text
        markdown-file(:id="$route.params.id" itemType="feats")
</template>

<script>
  export default {
    data () {
      const item = require(`~/static/data/feats/${this.$route.params.id}.md`)
      return {
        item: item.attributes
      }
    },
    head () {
      return {
        title: `${this.item.name} - Feats | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: `${this.item.name} feat` }
        ]
      }
    },
    layout: 'phb'
  }
</script>
