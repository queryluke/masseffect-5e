<template>
  <v-badge
    bordered
    color="primary"
    :offset-y="small ? 5 : undefined"
    :offset-x="small ? 5 : undefined"
    :overlap="!small"
    :dot="small"
    :value="item.upcast"
    :icon="!small ? 'mdi-chevron-double-up' : undefined"
  >
    <v-btn
      :x-small="small"
      :small="!small"
      depressed
      color="secondary"
      :disabled="!castable"
      @click.stop="castPower"
    >
      <small>cast</small>
    </v-btn>
  </v-badge>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/powers')

export default {
  name: 'MeCsPowersCastBtn',
  props: {
    item: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['klassPowercastingMaxes', 'techPoints', 'powerSlots']),
    powercastingType () {
      return this.klassPowercastingMaxes[this.item.source]?.powercastingType || this.item.resource?.id
    },
    powerSlotAtLevel () {
      return this.powerSlots[this.item.level]
    },
    castable () {
      if (!this.powercastingType) {
        return false
      }
      switch (this.powercastingType) {
        case 'slots':
          return this.powerSlotAtLevel.used < this.powerSlotAtLevel.max
        case 'points':
          return this.techPoints.used + this.item.level <= this.techPoints.max
        default:
          return false
      }
    }
  },
  methods: {
    castPower () {
      if (!this.powercastingType) {
        return
      }
      let value = 0
      switch (this.powercastingType) {
        case 'slots':
          value = this.powerSlotAtLevel.used + 1
          this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${this.item.level - 1}`, value })
          break
        case 'points':
          value = this.techPoints.used + this.item.level
          this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
          break
        default:
          break
      }
    }
  }
}
</script>
