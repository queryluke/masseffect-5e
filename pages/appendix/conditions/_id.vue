<template>
  <v-container>
    <me-page-title />
    <v-card>
      <v-card-text>
        <me-skeleton-loader :pending="$fetchState.pending" type="item">
          <me-html :content="item.html" />
        </me-skeleton-loader>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'conditions', id: this.$route.params.id })
    this.$store.commit('pageTitle', this.item.name)
  },
  data () {
    return {
      item: {}
    }
  },
  head () {
    return {
      title: `${this.item.name} - Condition | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Information about the ${this.item.name} condition` }
      ]
    }
  }
}
</script>
