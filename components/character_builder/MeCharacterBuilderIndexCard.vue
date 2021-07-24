<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar
        class="ma-3"
        :size="$vuetify.breakpoint.xsOnly ? 65 : 100"
        tile
      >
        <v-img
          :src="characterImage"
          contain
          :lazy-src="require('~/assets/images/me5e_logo_450w.png')"
          @error="require('~/assets/images/me5e_logo_450w.png')"
        />
      </v-avatar>
      <div>
        <v-card-title
          class="text-h5"
        >
          {{ characterName }}
        </v-card-title>
        <v-card-subtitle v-if="character.species && character.classes.length > 0">
          {{ identString }}
        </v-card-subtitle>
      </div>
    </div>
    <v-card-actions>
      <v-btn text :to="`/character-builder/${character.id}`">
        View
      </v-btn>
      <v-btn text :to="`/character-builder/${character.id}/edit`">
        Edit
      </v-btn>
      <v-spacer />
      <me-character-builder-character-delete :id="character.id" :name="characterName" text-btn />
    </v-card-actions>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    characterId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    cid () {
      return this.characterId
    }
  }
}
</script>
