<template>
  <v-container>
    <me-page-title />
    <p v-for="(para, index) in $t('character.background.intro')" :key="index">
      {{ para }}
    </p>
    <me-skeleton-loader :pending="$fetchState.pending" type="expansionList">
      <me-expansion-list
        :items="items"
        :headers="[{ label: 'Name', key: 'name' }]"
        :bookmarkable="false"
        type="backgrounds"
      />
    </me-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'backgrounds')
    this.$store.commit('pageTitle', this.$tc('character.background.title', 2))
  },
  head () {
    return {
      title: 'Backgrounds | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Backgrounds provide additional flavor and benefits to your character.' }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData('backgrounds')
    }
  }
}
</script>
