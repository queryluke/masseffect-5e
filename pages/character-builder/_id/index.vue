<template>
  <v-container>
    <me-character-sheet />
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  async asyncData ({ store }) {
    store.commit('pageTitle', 'Character Builder')
    await store.dispatch('FETCH_LOTS', ['species', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses', 'character-progression', 'skills', 'gear'])
  }
}
</script>
