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
    this.$store.commit('pageTitle', 'Vehicles')
    this.items = await this.$store.dispatch('FETCH_DATA', 'vehicles')
    this.loading = false
  },
  data () {
    return {
      items: [],
      loading: true
    }
  },
  computed: {
    transports () {
      return this.items.filter(v => v.vehicle.type === 'transport')
    },
    starships () {
      return this.items.filter(v => v.vehicle.type === 'starship')
    }
  },
  head () {
    return {
      title: 'Vehicles | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'A list of unique vehicles to use in your Mass Effect 5e game.' }
      ]
    }
  }
}
</script>
