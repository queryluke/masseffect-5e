<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/equipment#mods"
      model="mods"
      component="MeModList"
      default-sort="name"
    />
  </v-container>
</template>

<script>

export default {
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('mod_page_title', 2),
      subTitle: this.$tc('equipment_title', 2),
      description: this.$t('meta.mods')
    })
    this.$store.commit('pageTitle', this.$t('mod_page_title'))
    await this.$store.dispatch('FETCH_DATA', 'mods')
  }
}
</script>
