<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/powercasting"
      model="powers"
      component="MePowerList"
      default-sort="name"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('power_title', 2),
      description: this.$t('meta.powers')
    })
    this.items = await this.$store.dispatch('FETCH_DATA', 'powers')
  }
}
</script>
