<template>
  <v-container class="mt-5">
    <v-row justify="space-around">
      <v-col v-for="(item, index) in items" :key="index" cols="12" md="4">
        <me-skeleton-loader :pending="$fetchState.pending" type="card">
          <me-news-card :news="item" height="200px" />
        </me-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      changelog: [...Array(9).keys()]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$t('changelog_title'),
      description: this.$t('meta.changelog')
    })
    this.changelog = await this.$store.dispatch('FETCH_DATA', 'changelog')
  },
  computed: {
    items () {
      return this.changelog.filter(i => !i.id?.startsWith('april')).reverse()
    }
  }
}
</script>
