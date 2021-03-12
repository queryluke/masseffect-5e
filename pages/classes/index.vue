<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="6"
        xl="4"
        class="d-flex flex-column"
      >
        <me-skeleton-loader :pending="$fetchState.pending" type="card">
          <me-class-card :item="item" />
        </me-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Classes')
    this.items = await this.$store.dispatch('FETCH_DATA', 'classes')
  },
  data () {
    return {
      items: [...Array(6).keys()]
    }
  },
  head () {
    return {
      title: 'Classes | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Choose your favorite Mass Effect class, each with 3 subclasses to provide variety to the game.' }
      ]
    }
  }
}
</script>
