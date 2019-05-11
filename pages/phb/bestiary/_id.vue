<template lang="pug">
  v-container(fluid)
    v-card
      v-card-text
        stat-block(v-bind:stats="item").mt-3
</template>

<script>
  import StatBlock from '~/components/npc/StatBlock.vue'

  export default {
    components: {StatBlock},
    data () {
      const item = require(`~/static/data/bestiary/${this.$route.params.id}.json`)
      return {
        item
      }
    },
    head () {
      return {
        title: `${this.item.name} - Bestiary | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: `${this.item.name} stat block` }
        ]
      }
    },
    layout: 'phb'
  }
</script>
