<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="condition" />
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'conditions', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Conditions')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Condition | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about the ${this.item.name} condition` }
      ]
    }
  }
}
</script>
