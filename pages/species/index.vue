<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col v-for="item in items" :key="item.id" sm="6" md="4" class="d-flex flex-column">
        <me-skeleton-loader :pending="$fetchState.pending" type="card">
          <me-species-card :item="item" />
        </me-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      items: [...Array(9).keys()]
    }
  },
  async fetch () {
    this.$store.commit('pageTitle', this.$t('character.species.title'))
    this.items = await this.$store.dispatch('FETCH_DATA', 'species')
  },
  head () {
    return {
      title: 'Species | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Every species you need for a deeply involved Mass Effect Campaign.' }
      ]
    }
  }
}
</script>
