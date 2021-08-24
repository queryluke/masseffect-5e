<template>
  <v-container>
    <me-page-title />
    <div class="text-md-right">
      <v-btn to="/manual/vehicles" nuxt outlined color="primary">
        Vehicle Rules
      </v-btn>
    </div>
    <p class="text-subtitle-1">
      Transports
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-vehicle-list :items="transports" />
    </me-skeleton-loader>
    <p class="text-subtitle-1">
      Starships
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-vehicle-list :items="starships" />
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('vehicle_title', 2),
      description: this.$t('meta.vehicles')
    })
    await this.$store.dispatch('FETCH_DATA', 'vehicles')
  },
  computed: {
    items () {
      return this.$store.getters.getData('vehicles')
    },
    transports () {
      return this.items.filter(v => v.type === 'transport')
    },
    starships () {
      return this.items.filter(v => v.type === 'starship')
    }
  }
}
</script>
