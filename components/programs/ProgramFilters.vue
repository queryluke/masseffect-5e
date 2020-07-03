<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 sm6)
        v-select(:items="rarityOptions" v-model="rarityFilter" label="Rarity" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 sm6)
        v-checkbox(v-model="installationFilter" label="Requires Installation")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('itemList')

export default {
  props: {
    itemKey: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['filters', 'rarityOptions']),
    rarityFilter: {
      get () {
        return this.filters[this.itemKey].rarity
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'rarity', value })
      }
    },
    installationFilter: {
      get () {
        return this.filters[this.itemKey].activation
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'installation', value })
      }
    }
  },
  methods: {
    ...mapActions(['updateFilter']),
    reset () {
      this.rarityFilter = []
      this.installationFilter = false
    }
  }
}
</script>
