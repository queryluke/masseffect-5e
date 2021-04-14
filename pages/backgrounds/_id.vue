<template>
  <me-item-page :pending="$fetchState.pending" :item="item" :type="$tc('character.background.title', 1)" />
</template>

<script>
export default {
  data () {
    return {
      item: {}
    }
  },
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'backgrounds', id: this.$route.params.id })
    this.$store.commit('pageTitle', this.item.name)
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
