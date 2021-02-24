<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="bestiary">
    <template #header>
      <me-npc-title :item="item" />
    </template>
    <me-stat-block :stats="item" />
  </me-item-page>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'bestiary', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Bestiary')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Bestiary | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  }
}
</script>
