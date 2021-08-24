<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/equipment#armor"
      model="armor"
      component="MeArmorList"
      default-sort="name"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('armor_title', 2),
      subTitle: this.$tc('equipment_title', 2),
      description: this.$t('meta.armor')
    })
    await this.$store.dispatch('FETCH_DATA', 'armor')
  }
}
</script>
