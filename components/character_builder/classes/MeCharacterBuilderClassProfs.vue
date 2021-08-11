<template>
  <div>
    <v-row v-for="(profObj, profKey) in klassProficiencyOptions" :key="profKey">
      <v-col v-if="profObj.has || profObj.choices">
        <me-character-builder-prof-picker v-if="profObj" :options="{...profObj, profType: profKey}" :source="`klass-${klass.id}-profs`" />
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
