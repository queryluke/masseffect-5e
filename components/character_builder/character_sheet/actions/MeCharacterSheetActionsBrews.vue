<template>
  <div v-if="brews.length > 0">
    <div v-if="title" class="text-subtitle-1 mt-3">
      {{ title }}
    </div>
    <template v-for="brew of brews">
      <me-character-sheet-feature :key="`brew-${type}-${brew.id}`" :feature="brew" type="brew" />
    </template>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    brews () {
      const brews = this.character.brews || []
      return brews.filter(i => i.type === this.type)
    }
  }
}
</script>
