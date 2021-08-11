<template>
  <v-card outlined class="my-2">
    <div class="d-flex justify-space-between">
      <v-card elevation="0" color="transparent" class="flex-grow-1 pa-2" :ripple="false" @click="showFeature = !showFeature">
        {{ feature.name }}
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
    }
  },
  data () {
    return {
      showFeature: false
    }
  },
  computed: {
    uses () {
      if (this.feature.mechanics) {
        const useObj = this.feature.mechanics.find(i => i.has?.uses)
        if (useObj) {
          return useObj.has.uses
        }
      }
      return false
    },
    timesUsed: {
      get () {
        return this.character.currentStats.featuresTimesUsed[this.feature.id] || 0
      },
      set (value) {
        const setValue = value > this.uses ? this.uses : value < 0 ? 0 : value
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `currentStats.featuresTimesUsed.${this.feature.id}`, value: setValue })
      }
    }
  }
}
</script>
