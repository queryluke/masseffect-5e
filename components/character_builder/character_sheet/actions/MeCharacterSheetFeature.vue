<template>
  <v-card outlined class="my-2">
    <div class="d-flex justify-space-between">
      <v-card elevation="0" color="transparent" class="flex-grow-1 pa-2" :ripple="false" @click="showFeature = !showFeature">
        <div>
          {{ feature.name }}
        </div>
      </v-card>
      <div v-if="uses" class="flex-shrink-0 pa-2">
        <me-character-sheet-use-tracker :used="timesUsed" :uses="uses" @increment="timesUsed++" @decrement="timesUsed--" />
      </div>
    </div>
    <v-expand-transition>
      <div v-if="showFeature">
        <v-divider />
        <v-card-text class="mb-0">
          <me-html :content="feature.html" />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    feature: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showFeature: false
    }
  },
  computed: {
    isBarrier () {
      return this.type === 'class-features' && ['barrier-adept', 'barrier-sentinel', 'barrier-vanguard'].includes(this.feature.id)
    },
    uses () {
      // TODO: the singular 'class-feature' vs 'class-features' is used in the custom adder, should be fixed
      if (this.feature.mechanics) {
        if (this.isBarrier) {
          return this.csMaxBarrierUses
        }
        if (typeof this.feature.mechanics.uses === 'object') {
          return this.usesMethods[this.feature.mechanics.uses.method](...this.feature.mechanics.uses.params)
        }
        if (this.type === 'traits') {
          const useObj = this.feature.mechanics.find(i => i.has?.uses)
          if (useObj) {
            return useObj.has.uses
          }
        } else if (this.feature.mechanics?.uses) {
          return this.feature.mechanics?.uses
        }
      }
      return false
    },
    /*
    playerSelections () {
      const selections = []
      if (this.feature.mechanics) {
        const mechanicsWithChoices = this.feature.mechanics.filter(i => i.type === 'picker')
        for (const mechanic of mechanicsWithChoices) {
          const regexpTest1 = new RegExp(`${this.type}(.*?)${mechanic.id}`)
          const regexpTest2 = new RegExp(`${this.type}(.*?)${this.feature.id}`)
          const matches = this.selections.filter(i => (regexpTest1.test(i.source) || regexpTest2.test(i.source)) && i.value && i.type !== 'profs')
          for (const match of matches) {
            selections.push(this.$t(`misc.${match.value}`))
          }
        }
      }
      return [...new Set(selections)]
    },
    */
    timesUsed: {
      get () {
        const id = this.isBarrier ? 'barrier' : this.feature.id
        return this.character.currentStats.featuresTimesUsed[id] || 0
      },
      set (value) {
        const setValue = value > this.uses ? this.uses : value < 0 ? 0 : value
        const id = this.isBarrier ? 'barrier' : this.feature.id
        return this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `currentStats.featuresTimesUsed.${id}`, value: setValue })
      }
    },
    usesMethods () {
      return {
        halfKlassLevel: (klass, minimum = 1) => {
          const klassStats = this.characterClasses.find(i => i.id === klass)
          if (!klassStats) {
            return minimum
          } else {
            return Math.max(Math.floor(klassStats.levels / 2), minimum)
          }
        },
        equalToAbilityMod: (ability, minimum = 1) => {
          const mod = this.absMod(ability) || 0
          return Math.max(mod, minimum)
        },
        klassProgressionColumn: (klass, column) => {
          const klassStats = this.characterClasses.find(i => i.id === klass)
          if (!klassStats) {
            return 0
          } else {
            return this.getProgressionValue(klass, column, klassStats.levels)
          }
        },
        byLevel: (klass, levels) => {
          const klassStats = this.characterClasses.find(i => i.id === klass)
          if (!klassStats) {
            return 0
          } else {
            const availableLevels = levels.filter(i => i.level <= klassStats.levels)
            return availableLevels[availableLevels.length - 1].uses
          }
        }
      }
    }
  }
}
</script>
