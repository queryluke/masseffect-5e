<template>
  <v-row>
    <v-col class="text-left">
      <v-btn text to="/character-builder" nuxt>
        <v-icon class="mdi mdi-cheveron-left">
          mdi-chevron-left
        </v-icon>
        My Characters
      </v-btn>
    </v-col>
    <v-col class="text-right">
      <me-character-builder-character-delete :character="character" />
      <v-btn v-if="showCharacterSheet" @click="showCharacterSheet = false">
        Edit Character
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
