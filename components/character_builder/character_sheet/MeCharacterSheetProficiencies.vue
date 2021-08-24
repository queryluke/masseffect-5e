<template>
  <div>
    <me-character-sheet-card-title>
      Proficiencies
    </me-character-sheet-card-title>
    <template v-for="type in profTypes">
      <div :key="`prof-${type}`">
        <div class="text-body-1">
          {{ profLabel(type) }}
        </div>
        <p class="text-body-2">
          {{ getProfsList(type) }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      profTypes: ['armor', 'weapon', 'tool']
    }
  },
  methods: {
    getProfsList (type) {
      return this.proficiencies[type].map(i => this.profText(type, i)).join(', ')
    }
  }
}
</script>
