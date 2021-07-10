<template>
  <div>
    <div class="text-h6">
      Proficiencies
    </div>
    <v-row v-for="(profObj, profKey) in klassProficiencyOptions" :key="profKey">
      <v-col>
        <me-character-builder-class-prof-picker v-if="profObj" :type="profKey" :options="profObj" :class-index="classIndex" />
      </v-col>
    </v-row>
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
  }
}
</script>
