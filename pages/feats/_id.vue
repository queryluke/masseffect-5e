<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="feat" />
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'feats', id: this.$route.params.id })
    this.$store.commit('pageTitle', this.item.name)
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Feats | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about the ${this.item.name} feat` }
      ]
    }
  }
}
</script>
