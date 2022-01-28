<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar
        class="ma-3"
        :size="$vuetify.breakpoint.xsOnly ? 65 : 100"
        tile
      >
        <v-img
          :src="character.image"
          contain
          @error="require('~/assets/images/me5e.png')"
        />
      </v-avatar>
      <div>
        <v-card-title
          class="text-h5"
        >
          {{ name }}
        </v-card-title>
        <v-card-subtitle v-if="character.species && character.classes.length > 0">
          {{ identString(character) }}
        </v-card-subtitle>
      </div>
    </div>
    <v-card-actions>
      <v-btn text :to="`/characters/sheet?id=${character.id}`">
        View
      </v-btn>
      <v-btn text :to="`/characters/builder?id=${character.id}`">
        Edit
      </v-btn>
      <v-spacer />
      <me-character-delete :id="character.id" :name="name" text-btn />
    </v-card-actions>
  </v-card>
</template>

<script>
import { CharacterHelpers } from '~/mixins/character'

export default {
  mixins: [CharacterHelpers],
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  computed: {
    name () {
      return this.character.name || 'Unnamed Character'
    }
  }
}
</script>
