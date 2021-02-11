<template>
  <me-container>
    <v-card>
      <v-card-text>
        <me-gear-info :item="item" :title="true" />
      </v-card-text>
    </v-card>
  </me-container>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'gear', id: this.$route.params.id })
    this.$store.commit('loaded')
    this.$store.commit('pageTitle', this.item.name)
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Gear | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  }
}
</script>
