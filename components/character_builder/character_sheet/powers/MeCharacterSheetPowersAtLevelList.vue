<template>
  <div v-if="powersAtLevel.length > 0 || powerSlots > 0" class="mb-10">
    <div class="d-flex justify-space-between">
      <div>
        {{ label }}
      </div>
      <me-character-sheet-use-tracker
        v-if="powerLevel > 0 && powerSlots"
        :uses="powerSlots"
        :used="csGetPowerSlotsUsed(psIndex)"
        @increment="csSetPowerSlotsUsed(psIndex, csGetPowerSlotsUsed(psIndex) + 1)"
        @decrement="csSetPowerSlotsUsed(psIndex, csGetPowerSlotsUsed(psIndex) - 1)"
      />
    </div>
    <template v-for="(item, index) in powersAtLevel">
      <me-character-sheet-actions-power :key="`power-${item.power.id}-${index}`" :item="item" />
    </template>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    powerLevel: {
      type: Number,
      required: true
    }
  },
  computed: {
    psIndex () {
      return this.powerLevel - 1
    },
    powersAtLevel () {
      return this.csAllPowers.filter(i => i.power.level === this.powerLevel)
    },
    powerSlots () {
      return this.csPowerSlots ? this.csPowerSlots[this.psIndex] : 0
    },
    label () {
      if (this.powerLevel === 0) {
        return 'Cantrips'
      } else {
        return this.$t('level_nth', { nth: this.$t(`ordinal_numbers[${this.powerLevel}]`) })
      }
    }
  }
}
</script>
