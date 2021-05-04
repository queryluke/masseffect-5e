<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="bestiary">
    <template #header>
      <me-npc-title :item="item" />
    </template>
    <me-npc-stat-block :stats="item" />
  </me-item-page>
</template>

<script>
export default {
  data () {
    return {
      item: {}
    }
  },
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'bestiary', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Bestiary')
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
