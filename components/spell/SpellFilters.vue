<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md6)
        v-select(:items="typeOptions" v-model="typeFilter" label="Spell Type" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md6)
        v-select(:items="classOptions" v-model="classFilter" label="Classes" multiple menu-props="{maxHeight:'400'}")
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
  data () {
    return {
      typeOptions: [
        { value: 'biotic', text: 'Biotic' },
        { value: 'tech', text: 'Tech' },
        { value: 'combat', text: 'Combat' }
      ],
      classOptions: [
        { value: 'adept', text: 'Adept' },
        { value: 'engineer', text: 'Engineer' },
        { value: 'infiltrator', text: 'Infiltrator' },
        { value: 'sentinel', text: 'Sentinel' },
        { value: 'soldier', text: 'Soldier' },
        { value: 'vanguard', text: 'Vanguard' }
      ]
    }
  },
  computed: {
    ...mapGetters(['filters']),
    typeFilter: {
      get () {
        return this.filters[this.itemKey].type
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'type', value })
      }
    },
    classFilter: {
      get () {
        return this.filters[this.itemKey].availableClasses
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'availableClasses', value })
      }
    }
  },
  methods: {
    ...mapActions(['updateFilter']),
    reset () {
      this.classFilter = []
      this.typeFilter = []
    }
  }
}
</script>
