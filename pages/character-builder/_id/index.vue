<template>
  <v-container>
    <me-character-not-ready v-if="!characterReady" />
    <me-character-sheet v-else />
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  layout: 'charactersheet',
  async asyncData ({ store }) {
    store.commit('pageTitle', 'Mass Effect 5e')
    await store.dispatch('cb/FETCH_CB_DATA')
  }
}
</script>
