<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="mod">
    <template #header>
      <me-mod-title :item="item" />
    </template>
    <me-mod-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'mods', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Mods')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Mods | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  }
}
</script>
