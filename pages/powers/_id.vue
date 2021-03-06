<template>
  <me-item-page :pending="$fetchState.pending" :item="item" type="power">
    <template #header>
      <me-item-title
        :title="item.name"
        avatar
        :avatar-src="require(`~/assets/images/powers/${item.type}.svg`)"
      />
    </template>
    <me-power-info :item="item" />
  </me-item-page>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'powers', id: this.$route.params.id })
    this.$store.commit('pageTitle', 'Powers')
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Powers | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about ${this.item.name}` }
      ]
    }
  }
}
</script>
