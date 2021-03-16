<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="weapon">
    <template #header>
      <me-weapon-title :item="item" />
    </template>
    <me-weapon-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'weapons', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Weapons')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Weapons | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  }
}
</script>
