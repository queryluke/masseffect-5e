<template>
  <v-container>
    <me-page-title />
    <me-skeleton-loader :pending="$fetchState.pending" type="articleList">
      <div>
        <me-benefits-item v-for="item in items" :key="item.id" :item="item" class="mb-2" />
      </div>
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: 'Reputation Benefits',
      subtitle: this.$t('appendix_title'),
      description: 'Information about Paragon and Renegade benefits'
    })
    await this.$store.dispatch('FETCH_DATA', 'edges')
  },
  computed: {
    items () {
      return this.$store.getters.getData('edges').filter(i => i.type === 'benefits').slice().sort((a, b) => a.threshold - b.threshold)
    }
  },
  methods: {

  }
}
</script>
