<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="background" />
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'backgrounds', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Backgrounds')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Backgrounds | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about the ${this.item.name} background` }
      ]
    }
  }
}
</script>
