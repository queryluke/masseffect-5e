<template>
  <v-card flat tile outlined>
    <v-card-text>
      <me-html v-if="!loading" :content="toDisplay.html" />
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
    sideNav () {
      return this.$store.getters['character/navigation/sideNav']
    },
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
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
