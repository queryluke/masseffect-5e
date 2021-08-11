<template>
  <div class="mt-5">
    <div class="text-h6">
      {{ klassData.name }}
    </div>
    <me-hr :size="2" />
    <template v-for="feature in klassFeaturesToDisplay">
      <me-character-sheet-feature :key="`klass-feature-${feature.id}`" :feature="feature" />
    </template>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    klassFeaturesToDisplay () {
      return this.availableKlassFeatures.filter(i => !['abi', 'subclass'].includes(i.id))
    }
  }
}
</script>
