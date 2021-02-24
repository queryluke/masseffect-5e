<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="gear">
    <template #header>
      <me-gear-title :item="item" />
    </template>
    <me-gear-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'gear', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Gear')
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
