<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="unitOptions" v-model="unitFilter" label="Faction" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md6)
        v-select(:items="crOptions" v-model="crFilter" label="CR" multiple menu-props="{maxHeight:'400'}")
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
    },
    crOptions: {
      type: Array,
      default: () => { return [] }
    },
    unitOptions: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    ...mapGetters(['filters']),
    unitFilter: {
      get () {
        return this.filters[this.itemKey].unit
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'unit', value })
      }
    },
    crFilter: {
      get () {
        return this.filters[this.itemKey].cr
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'cr', value })
      }
    }
  },
  methods: {
    ...mapActions(['updateFilter']),
    reset () {
      this.crFilter = []
      this.unitFilter = []
    }
  }
}
</script>
