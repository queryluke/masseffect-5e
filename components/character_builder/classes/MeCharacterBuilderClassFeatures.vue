<template>
  <v-expansion-panels multiple>
    <!-- Hit points -->
    <me-character-builder-aspect :aspect="hitPointFeature" :subtitle="nthLevelText(1)">
      <me-character-builder-class-hit-points :class-index="classIndex" />
    </me-character-builder-aspect>

    <!-- Profs -->
    <me-character-builder-aspect :aspect="profFeature" :subtitle="nthLevelText(1)" :has-selections="profsHasSelections">
      <me-character-builder-class-profs :class-index="classIndex" />
    </me-character-builder-aspect>
    <template v-for="feature in availableKlassFeatures">
      <!-- Subclass -->
      <me-character-builder-aspect v-if="feature.id === 'subclass'" :key="feature.id" :aspect="feature" :subtitle="nthLevelText(feature.level)" :has-selections="!subklass">
        <me-character-builder-class-subclass-picker :class-index="classIndex" />
      </me-character-builder-aspect>

      <!-- Ability score increase -->
      <me-character-builder-aspect v-else-if="feature.id === 'abi'" :key="`${feature.id}-${feature.level}`" :aspect="feature" :subtitle="nthLevelText(feature.level)" :has-selections="abiHasSelections(feature.level)">
        <me-character-builder-class-abi-picker :class-index="classIndex" :abi-level="feature.level" />
      </me-character-builder-aspect>

      <!-- everything else -->
      <me-character-builder-aspect v-else :key="feature.id" :aspect="feature" :path="`classes.${classIndex}.featureSelections`" :subtitle="nthLevelText(feature.level)" />
    </template>
  </v-expansion-panels>
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
    hitPointFeature () {
      return {
        name: 'Hit Points'
      }
    },
    profFeature () {
      return {
        name: 'Proficiencies'
      }
    },
    profsHasSelections () {
      const profTypes = Object.keys(this.klassProficiencyOptions)
      const checks = []
      for (const profType of profTypes) {
        if (this.klassProficiencyOptions[profType].choices) {
          const selections = this.klass.profSelections[profType]
          const count = this.klassProficiencyOptions[profType].choices.count
          if (!selections || selections.length < count) {
            checks.push(true)
          }
        }
      }
      return checks.some(i => i === true)
    }
  },
  methods: {
    nthLevelText (level) {
      return this.$t('level_nth', { nth: this.$t(`ordinal_numbers[${level}]`) })
    },
    abiHasSelections (level) {
      const id = `${this.klass.id}-abi-${level}`
      if (!this.klass.featureSelections[id]) {
        return true
      }
      console.log('abi', this.klass.featureSelections[id].value)
      if (!this.klass.featureSelections[id].value || (this.klass.featureSelections[id].value[0] === null && this.klass.featureSelections[id].value[1] === null)) {
        return true
      }
    }
  }
}
</script>
