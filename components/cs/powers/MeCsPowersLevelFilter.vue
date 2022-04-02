<template>
  <v-chip-group>
    <v-chip x-small>
      test
    </v-chip>
  </v-chip-group>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowersLevelFilter',
  props: {
    learned: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      powersLevelFilter: 'navigation/powersLevelFilter',
      learnedPowersLevelFilter: 'navigation/learnedPowersLevelFilter',
      selectedPowers: 'powers/selectedPowers'
    })
  }
}
</script>
