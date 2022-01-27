<template>
  <div class="mx-n3 mx-sm-4">
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Features & Traits
    </me-character-sheet-card-title>
    <v-chip-group v-model="tab" active-class="primary--text" column>
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`action-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
    <div v-show="showTab(1)">
      <div class="text-subtitle-1 mt-3">
        Class Features
      </div>
      <me-character-sheet-actions-brews type="class-feature" />
      <template v-for="(klass, index) of characterClasses">
        <me-character-sheet-class-features :key="`klass-features-for-${klass.id}`" :class-index="index" />
      </template>
    </div>
    <div v-show="showTab(2)">
      <me-cs-feature-list :items="csSpeciesTraits">
        Species Traits
      </me-cs-feature-list>
    </div>
    <div v-show="showTab(3)">
      <me-cs-feature-list :items="csReputationBenefits">
        Reputation Benefits
      </me-cs-feature-list>
    </div>
    <div v-show="showTab(4)">
      <me-cs-feature-list :items="csSelectedFeats">
        Feats
      </me-cs-feature-list>
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      tab: 0,
      tabs: ['All', 'Class Features', 'Species Traits', 'Reputation Benefits', 'Feats']
    }
  },
  computed: {
    csClassFeatures () {
      // TODO
      return []
    },
    csSpeciesTraits () {
      return [
        ...this.speciesTraits,
        ...this.csCustomAsFeature.trait
      ]
    },
    csReputationBenefits () {
      // TODO
      return [
      ]
    },
    csSelectedFeats () {
      return [
        ...this.selectedFeats.map(i => this.$store.getters.getData('feats', i)),
        ...this.csFeats,
        ...this.csCustomAsFeature.feat
      ]
    },
    csCustomAsFeature () {
      const brew = this.character.brews
        .filter(i => ['feat', 'trait'].includes(i.type))
        .map((i) => {
          return {
            name: i.name,
            type: i.type,
            resource: i.mechanics.uses
              ? { displayType: 'checkbox', reset: i.mechanics.recharge, max: { type: 'flat', value: i.mechanics.uses }, id: i.id }
              : false,
            moreInfo: {
              bind: i.html
            }
          }
        })
      return {
        trait: brew.filter(i => i.type === 'trait'),
        feat: brew.filter(i => i.type === 'feat')
      }
    }
  },
  methods: {
    showTab (index) {
      if (this.tab === 0) {
        return true
      }
      return this.tab === index
    }
  }
}
</script>
