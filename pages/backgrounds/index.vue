<template>
  <v-container>
    <me-page-title />
    <p v-for="(para, index) in $t('background_intro')" :key="index">
      {{ para }}
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :bookmarkable="false"
        :headers="headers"
        type="backgrounds"
      />
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { label: 'Name', key: 'name' }
      ]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('background_title', 2),
      description: this.$t('meta.backgrounds')
    })
    await this.$store.dispatch('FETCH_DATA', 'backgrounds')
  },
  computed: {
    items () {
      return this.$store.getters.getData('backgrounds')
    }
  }
}
</script>
