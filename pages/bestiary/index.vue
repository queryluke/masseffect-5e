<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/bestiary"
      model="bestiary"
      component="MeNpcList"
      default-sort="name"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('bestiary_title', 2),
      description: this.$t('meta.bestiary')
    })
    await this.$store.dispatch('FETCH_LOTS', ['bestiary', 'npc-stats'])
  }
}
</script>
