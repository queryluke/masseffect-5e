<template>
  <div>
    <div class="text-overline">
      Defenses
    </div>
    <template v-for="type of ['resistance', 'immunity', 'vulnerability']">
      <v-divider v-if="type === 'vulnerability'" :key="`${type}-divider`" class="my-2" />
      <me-cs-defense-item :key="type" :item="defenses[type]" class="my-1" />
    </template>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  computed: {
    defenses () {
      return {
        resistance: this.getIrvObject('resistance'),
        immunity: this.getIrvObject('immunity'),
        vulnerability: this.getIrvObject('vulnerability')
      }
    }
  }
}
</script>
