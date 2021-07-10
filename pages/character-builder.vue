<template>
  <v-container>
    <me-character-builder />
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store }) {
    store.commit('pageTitle', 'Character Builder')
    await store.dispatch('FETCH_LOTS', ['species', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses', 'character-progression', 'skills', 'gear'])
  }
}
</script>
