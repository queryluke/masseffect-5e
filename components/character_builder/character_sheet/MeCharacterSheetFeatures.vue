<template>
  <div>
    <me-character-sheet-card-title>
      Features & Traits
    </me-character-sheet-card-title>
    <v-chip-group v-model="tab" active-class="primary--text">
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`feature-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <template v-for="(klass, index) of characterClasses">
          <me-character-sheet-class-features :key="`klass-features-for-${klass.id}`" :class-index="index" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <template v-for="trait of speciesTraits">
          <me-character-sheet-feature :key="`species-trait-${trait.id}`" :feature="trait" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <template v-for="feat of csFeats">
          <me-character-sheet-feature :key="`selected-feat-${feat.id}`" :feature="feat" />
        </template>
      </v-tab-item>
      <v-tab-item>
        <div v-if="backgroundData">
          <div class="text-h6">
            {{ backgroundData.name }}
          </div>
          <me-html :content="backgroundData.html" />
        </div>
        <div v-else>
          Please select a background.
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      tab: 0,
      tabs: ['Class', 'Species', 'Feats', 'Background']
    }
  }
}
</script>
