<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="armor">
    <template #header>
      <me-armor-title :item="item" />
    </template>
    <me-armor-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'armor', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Armor')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Armor | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  }
}
</script>
