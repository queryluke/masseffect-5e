<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col v-for="item in items" :key="item.id" sm="6" md="4" class="d-flex flex-column">
        <me-skeleton-loader :pending="$fetchState.pending" type="card">
          <me-species-card :item="item" />
        </me-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('species_title', 2),
      description: this.$t('meta.species')
    })
    await this.$store.dispatch('FETCH_LOTS', ['species', 'traits'])
  },
  computed: {
    items () {
      if (this.$fetchState.pending) {
        return [...Array(9).keys()]
      }
      return this.$store.getters.getData('species')
    }
  }
}
</script>
