<template>
  <v-container>
    <me-page-title />
    <template v-for="type of types">
      <me-bookmark-group :key="type" :type="type" />
    </template>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      types: ['weapons', 'armor', 'gear', 'mods', 'vehicles', 'powers', 'bestiary']
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.$t('bookmarks_title'),
      description: this.$t('meta.bookmarks')
    })
  }
}
</script>
