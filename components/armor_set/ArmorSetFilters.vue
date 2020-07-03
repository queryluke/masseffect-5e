<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md3)
        v-select(:items="rarityOptions" v-model="rarityFilter" label="Rarity" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md3)
        v-select(:items="typeOptions" v-model="typeFilter" label="Type" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md3)
        v-select(:items="armorTypeOptions" v-model="armorTypeFilter" label="Armor Type" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md3)
        v-select(:items="noteOptions" v-model="noteFilter" label="Benefits" multiple menu-props="{maxHeight:'400'}")
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
    noteOptions: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      typeOptions: ['Chest', 'Head', 'Arms', 'Legs', 'Body Armor', 'Full Set'],
      armorTypeOptions: ['Light', 'Medium', 'Heavy']
    }
  },
  computed: {
    ...mapGetters(['filters', 'rarityOptions']),
    typeFilter: {
      get () {
        return this.filters[this.itemKey].type
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'type', value })
      }
    },
    armorTypeFilter: {
      get () {
        return this.filters[this.itemKey].armorType
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'armorType', value })
      }
    },
    noteFilter: {
      get () {
        return this.filters[this.itemKey].notes
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'notes', value })
      }
    },
    rarityFilter: {
      get () {
        return this.filters[this.itemKey].rarity
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'rarity', value })
      }
    }
  },
  methods: {
    ...mapActions(['updateFilter']),
    reset () {
      this.typeFilter = []
      this.armorTypeFilter = []
      this.noteFilter = []
      this.rarityFilter = []
    }
  }
}
</script>
