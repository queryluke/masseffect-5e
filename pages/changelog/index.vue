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
  async fetch () {
    this.changelog = await this.$store.dispatch('FETCH_DATA', 'changelog')
  },
  data () {
    return {
      changelog: [...Array(9).keys()]
    }
  },
  computed: {
    items () {
      return this.changelog.slice().reverse()
    }
  },
  head () {
    return {
      title: 'Changelog | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Keep up-to-date with all the Mass Effect 5e system rule additions and updates.' }
      ]
    }
  }
}
</script>
