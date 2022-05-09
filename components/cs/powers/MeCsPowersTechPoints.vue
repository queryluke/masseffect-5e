<template>
  <me-cb-debounced-number-input
    v-if="techPoints.max > 0"
    :current="currentTp"
    :max="techPoints.max"
    label="Tech Points"
    @add="addTp"
    @remove="removeTp"
    @set="setTp"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowersTechPoints',
  computed: {
    ...mapGetters({
      techPoints: 'powers/techPoints'
    }),
    currentTp () {
      return this.techPoints.max - this.techPoints.used
    }
  },
  methods: {
    // These are technically "backwards" because adding TP = removing tp used
    addTp () {
      const value = Math.max(0, this.techPoints.used - 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    removeTp () {
      const value = Math.min(this.techPoints.max, this.techPoints.used + 1)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    },
    setTp (v) {
      // set value is 5...meaning they want current tp (max - used) to = 5
      // so we want 7 - x = 5
      // x = (value - max) * -1
      const value = Math.max(0, ((v - this.techPoints.max) * -1))
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
    }
  }
}
</script>
