<template>
  <v-badge
    bordered
    color="primary"
    :offset-y="small ? 5 : undefined"
    :offset-x="small ? 5 : undefined"
    :overlap="!small"
    :dot="small"
    :value="!atWill && item.upcast"
    :icon="!small ? 'mdi-chevron-double-up' : undefined"
  >
    <v-btn
      :x-small="small"
      :small="!small"
      depressed
      :text="atWill"
      color="secondary"
      :disabled="!castable"
      @click.stop="castPower"
    >
      <small>{{ atWill ? 'at will' : useable ? 'use' : 'cast' }}</small>
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
    atWill () {
      const isCantrip = this.item.level === 0 && !this.item.resource
      let alwaysCastable = false
      if (typeof this.item.alwaysCastable === 'object') {
        alwaysCastable = this.$store.getters['character/mechanics/mcBonus'](this.item.alwaysCastable)
      } else if (typeof this.item.alwaysCastable === 'number') {
        alwaysCastable = this.item.alwaysCastable
      }
      return isCantrip || (alwaysCastable && alwaysCastable >= this.item.level)
    },
    useable () {
      return this.item.resource && this.item.resource.reset !== 'cast'
    },
    castable () {
      if (this.atWill || !this.powercastingType) {
        return false
      }
      if (this.item.resource && this.item.resource.reset !== 'cast') {
        const max = this.$store.getters['character/mechanics/mcBonus'](this.item.resource.max || { type: 'flat', value: 1 })
        return (this.$store.getters['character/resources/resources'][this.item.resource.id] || 0) < max
      }
      switch (this.powercastingType) {
        case 'slots':
          return this.powerSlotAtLevel.used < this.powerSlotAtLevel.max
        case 'points':
          return this.item.level <= this.techPoints.limit && this.techPoints.used + this.item.level <= this.techPoints.max
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
      if (this.item.resource) {
        // reset 'cast' resources need to reset the resource on a cast
        if (this.item.resource.reset === 'cast') {
          let resetTo = 1
          if (this.item.resource.resetTo === 'max') {
            resetTo = this.$store.getters['character/mechanics/mcBonus'](this.item.resource.max || { type: 'flat', value: 1 })
          } else {
            resetTo = this.item.resource.min || 0
          }
          this.$store.dispatch('character/resources/SET_RESOURCE', { id: this.item.resource.id, value: resetTo })
        } else {
          // otherwise decrement the resource
          const currentValue = this.$store.getters['character/resources/resources'][this.item.resource.id] || 0
          this.$store.dispatch('character/resources/SET_RESOURCE', { id: this.item.resource.id, value: currentValue + 1 })
        }
      }
      if (this.item.type !== 'combat') {
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
}
</script>
