<template>
  <v-container>
    <!-- TODO: character unready -->
    <me-character-sheet />
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  async asyncData ({ store }) {
    store.commit('pageTitle', 'Character Builder')
    await store.dispatch('cb/FETCH_CB_DATA')
  },
  computed: {
    characterReady () {
      return this.speciesId && this.characterClasses.length > 0 && this.allAbilityScoresSet
    }
  }
}
</script>
