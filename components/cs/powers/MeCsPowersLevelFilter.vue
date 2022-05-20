<template>
  <v-btn-toggle v-model="filterValue" color="primary" borderless>
    <v-btn v-for="item in items" :key="item.text" x-small :value="item.value" max-width="25px">
      {{ item.text }}
    </v-btn>
  </v-btn-toggle>
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
    },
    maxLevel: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      levels: ['all', 0, 1, 2, 3, 4, 5]
    }
  },
  computed: {
    ...mapGetters({
      powersLevelFilter: 'navigation/powersLevelFilter',
      learnedPowersLevelFilter: 'navigation/learnedPowersLevelFilter'
    }),
    items () {
      return this.levels.filter(i => i === 'all' || i <= this.maxLevel).map((i) => {
        return {
          value: i,
          text: i === 'all' ? 'All' : i === 0 ? '- 0 -' : this.$t(`ordinal_numbers[${i}]`)
        }
      })
    },
    filterValue: {
      get () {
        return this.learned
          ? this.learnedPowersLevelFilter
          : this.powersLevelFilter
      },
      set (value) {
        this.learned
          ? this.$store.commit('character/navigation/SET', { key: 'learnedPowersLevelFilter', value })
          : this.$store.commit('character/navigation/SET', { key: 'powersLevelFilter', value })
      }
    }
  }
}
</script>
