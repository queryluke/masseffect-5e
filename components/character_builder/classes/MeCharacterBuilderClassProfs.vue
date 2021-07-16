<template>
  <div>
    <div class="text-h6">
      Proficiencies
    </div>
    <v-row v-for="(profObj, profKey) in klassProficiencyOptions" :key="profKey">
      <v-col>
        <me-character-builder-prof-picker v-if="profObj" :options="{...profObj, profType: profKey}" :path="`classes.${classIndex}.profSelections.${profKey}`" />
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
