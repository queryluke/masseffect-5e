<template>
  <v-container>
    <me-page-title title="Backgrounds" />
    <p>
      The sample backgrounds presented here provide both concrete benefits (features, proficiencies, and languages) and
      roleplaying suggestions.
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
    this.items = await this.$store.dispatch('FETCH_DATA', 'backgrounds')
    this.$store.commit('pageTitle', 'Backgrounds')
  },
  data () {
    return {
      items: []
    }
  },
  head () {
    return {
      title: 'Backgrounds | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Backgrounds provide additional flavor and benefits to your character.' }
      ]
    }
  }
}
</script>
