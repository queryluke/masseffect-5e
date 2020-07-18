<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Vehicles
    div.text-md-right
      v-btn(to="/phb/rules/vehicles" nuxt outlined color="primary") Vehicle Rules
    me-vehicle-list(v-if="!loading" :items="items")

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
