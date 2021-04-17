<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/equipment"
      model="gear"
      component="MeGearList"
      default-sort="name"
    />
  </v-container>
</template>

<script>

export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('gear_title', 2),
      subTitle: this.$tc('equipment_title', 2),
      description: this.$t('meta.gear')
    })
    await this.$store.dispatch('FETCH_DATA', 'gear')
  }
}
</script>
