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

    <me-tpg s="h3" class="mt-8">
      Expanded Class Options
    </me-tpg>
    <v-row>
      <v-col
        v-for="(aItem, aIndex) in addItems"
        :key="`add-${aIndex}`"
        cols="12"
        md="6"
        xl="4"
        class="d-flex flex-column"
      >
        <me-skeleton-loader :pending="$fetchState.pending" type="card">
          <me-class-card :item="aItem" />
        </me-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('class_title', 2),
      description: this.$t('meta.classes')
    })
    await this.$store.dispatch('FETCH_DATA', 'classes')
  },
  computed: {
    items () {
      return this.$fetchState.pending ? [...Array(6).keys()] : this.$store.getters.getData('classes').filter(i => !i.author)
    },
    addItems () {
      return this.$fetchState.pending ? [...Array(3).keys()] : this.$store.getters.getData('classes').filter(i => i.author)
    }
  }
}
</script>
