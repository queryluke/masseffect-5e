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

      <!-- fighting style -->
      <me-character-builder-aspect
        v-else-if="feature.id.includes('fighting-style')"
        :key="feature.id"
        :aspect="feature"
        :has-selections="!character.fightingStyles || !character.fightingStyles.find(i => i.id === feature.id)"
        :subtitle="nthLevelText(feature.level)"
      >
        <me-character-builder-fighting-style-picker :id="feature.id" />
        <me-html :content="feature.html" />
      </me-character-builder-aspect>

      <!-- Ability score increase -->
      <me-character-builder-aspect v-else-if="feature.id === 'abi'" :key="`${feature.id}-${feature.level}`" :aspect="feature" :subtitle="nthLevelText(feature.level)" :has-selections="abiHasSelections(feature.level)">
        <me-character-builder-abi-picker :source="`klass-${klass.id}-${feature.level}-abi`">
          <p>{{ abiText(feature.level) }}</p>
          <p>{{ $t('abi_feature.feat_text') }}</p>
        </me-character-builder-abi-picker>
      </me-character-builder-aspect>

      <!-- everything else -->
      <me-character-builder-aspect v-else :key="feature.id" :aspect="feature" :parent-source="`klass-${klass.id}-${feature.level}${feature.subclass ? `-${feature.subclass}` : ''}`" :subtitle="nthLevelText(feature.level)" />
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
          const selection = this.selections.find(i => i.source === `klass-${this.klass.id}-profs-${profType}`)
          const count = this.klassProficiencyOptions[profType].choices.count
          if (!selection || selection.value.length < count) {
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
      const selection = this.selections.find(i => i.source === `klass-${this.klass.id}-${level}-abi`)
      return !selection || !selection.value
    },
    abiText (level) {
      return this.$t('abi_feature.text', { at_level: this.$tc('abi_feature.at_level', 1, { level: this.$t('level_nth', { level: this.$t(`ordinal_numbers[${level}]`) }) }) })
    }
  }
}
</script>
