<template>
  <character-sheet v-if="!loading" />
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', 'Character Builder (BETA)')
    await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'search-index'),
      this.$store.dispatch('FETCH_DATA', 'weapons'),
      this.$store.dispatch('FETCH_DATA', 'armor'),
      this.$store.dispatch('FETCH_DATA', 'powers'),
      this.$store.dispatch('FETCH_DATA', 'feats'),
      this.$store.dispatch('FETCH_DATA', 'backgrounds'),
      this.$store.dispatch('FETCH_DATA', 'classes'),
      this.$store.dispatch('FETCH_DATA', 'class-features')
    ])
    this.loading = false
  },
  data () {
    return {
      loading: true
    }
  }
}
</script>
