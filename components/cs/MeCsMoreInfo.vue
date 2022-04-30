<template>
  <v-card flat tile outlined>
    <v-card-text v-if="!loading">
      <component :is="toDisplay.moreInfo.component" v-if="toDisplay.moreInfo && toDisplay.moreInfo.component" :item="toDisplay.moreInfo.bind" />
      <me-html v-else-if="html" :content="html" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsMoreInfo',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    html () {
      if (this.toDisplay.moreInfo?.model) {
        return this.$store.getters.getItem(this.toDisplay.moreInfo.model, this.toDisplay.moreInfo.id).html
      }
      return this.toDisplay.moreInfo?.bind || this.toDisplay.html || false
    }
  },
  watch: {
    toDisplay () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1)
    }
  }
}
</script>
