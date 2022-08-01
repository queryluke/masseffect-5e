<template>
  <div v-if="(levelFilter === 'all' || levelIndex === levelFilter) && isCastableLevel" class="mb-5">
    <v-row align="end">
      <v-col cols="3" sm="2">
        <div class="text-subtitle-2 mt-5">
          {{ title }}
        </div>
      </v-col>
      <v-col v-if="levelIndex > 0" cols="8" sm="6">
        <me-cs-action-resource-display-checkbox
          v-if="psAtLevel.max > 0"
          :current="psAtLevel.used"
          :max="psAtLevel.max"
          @add="addPs"
          @remove="removePs"
          @set="setPs($event)"
        />
      </v-col>
      <v-col v-if="levelIndex > 0 && $vuetify.breakpoint.smAndUp">
        <me-cs-powers-tech-points />
      </v-col>
    </v-row>
    <me-hr size="1" />
    <me-cs-action-cards-power
      v-for="(item, itemIndex) in powersAtLevel"
      :key="`powerslist-at-level-${itemIndex}`"
      :item="item"
      :class="powersAtLevel[itemIndex - 1] && powersAtLevel[itemIndex - 1].resource ? 'mt-4' : 'mt-1'"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowersLevelHeader',
  props: {
    level: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      techPoints: 'powers/techPoints',
      powerSlots: 'powers/powerSlots',
      levelFilter: 'navigation/powersLevelFilter',
      klassPowercastingMaxes: 'powers/klassPowercastingMaxes',
      powers: 'powers/powers'
    }),
    levelIndex () {
      return parseInt(this.level, 10)
    },
    title () {
      return this.levelIndex === 0 ? 'Cantrips' : this.$t('level_nth', { nth: this.$t(`ordinal_numbers[${this.levelIndex}]`) })
    },
    psAtLevel () {
      return this.powerSlots[this.level] || this.powerSlots[this.levelIndex] || { max: 0, used: 0 }
    },
    hasPowerSlotAtLevel () {
      return Object.entries(this.powerSlots).filter(i => i[1].max > 0).map(i => parseInt(i[0], 10)).includes(this.levelIndex)
    },
    isCastableLevel () {
      if (this.levelIndex === 0) {
        return true
      }
      if (this.powersAtLevel.filter(i => i.alwaysCastable).length) {
        return true
      }
      return this.levelIndex <= this.techPoints.limit || this.hasPowerSlotAtLevel
    },
    powersAtLevel () {
      return this.powers.filter((i) => {
        // of level
        if (i.level !== this.levelIndex) {
          return false
        }
        // cantrips always return true
        if (i.level === 0) {
          return true
        }
        // castable at this level
        const pcType = this.klassPowercastingMaxes[i.source]?.powercastingType
        if (pcType === 'slots') {
          return this.hasPowerSlotAtLevel
        } else if (pcType === 'points') {
          return this.levelIndex <= this.techPoints.limit
        } else {
          return true
        }
      })
    }
  },
  methods: {
    addPs () {
      const value = Math.min(this.psAtLevel.max, this.psAtLevel.used + 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${this.levelIndex - 1}`, value })
    },
    removePs () {
      const value = Math.max(0, this.psAtLevel.used - 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${this.levelIndex - 1}`, value })
    },
    setPs (value) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${this.levelIndex - 1}`, value })
    }
  }
}
</script>
