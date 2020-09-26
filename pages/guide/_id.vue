<template>
  <v-container>
    <me-page-title :title="pageTitle" />
    <me-rule-card v-for="item in items" :key="item.id" :item="item" />
  </v-container>
</template>

<script>

export default {
  async fetch () {
    this.$store.commit('pageTitle', this.pageTitle)
    await this.$store.dispatch('FETCH_DATA', 'gmg')
    this.items = this.$store.getters.getData('gmg')
      .filter(item => item.section === this.$route.params.id)
      .sort((a, b) => a.order > b.order ? 1 : -1)
  },
  data () {
    return {
      titles: {
        'armor-creation': 'Creating Armor',
        'vehicle-creation': 'Creating New Vehicles',
        'encounter-creation': 'Creating Encounters'
      },
      items: []
    }
  },
  computed: {
    pageTitle () {
      return this.titles[this.$route.params.id]
    }
  },
  head () {
    return {
      title: `${this.pageTitle} | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: 'The Galaxy Masters section has handy tools and guides for expanding your campaign' }
      ]
    }
  }
}
</script>
