<template>
  <v-expansion-panel>
    <v-expansion-panel-header :disable-icon-rotate="hasSelections" :color="hasSelections ? 'primary' : undefined ">
      <div>
        <div class="text-subtitle">
          {{ feature.name }}
        </div>
        <div class="text-caption">
          {{ $t('level_nth', {nth: $t(`ordinal_numbers[${feature.level}]`)}) }}
        </div>
      </div>
      <template v-if="hasSelections" #actions>
        <v-icon>
          mdi-alert-circle
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="mt-3">
        <me-html v-if="feature.html" :content="feature.html" />
        <component :is="feature.component" v-if="feature.component" :feature-selection-id="feature.id" :class-index="classIndex" />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    feature: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasSelections () {
      if (this.feature.id === 'proficiencies') {
        const profTypes = Object.keys(this.klassProficiencyOptions)
        const checks = []
        for (const profType of profTypes) {
          if (this.klassProficiencyOptions[profType].choices) {
            const selections = this.getKlassProfSelections(profType)
            const count = this.klassProficiencyOptions[profType].choices.count
            if (!selections || selections.length < count) {
              checks.push(true)
            }
          }
        }
        return checks.some(i => i === true)
      } else if (this.feature.id === 'hit-points') {
        return false
      } else {
        return this.feature.component && !this.klass.featureSelections[this.feature.id]
      }
    }
  }
}
</script>
