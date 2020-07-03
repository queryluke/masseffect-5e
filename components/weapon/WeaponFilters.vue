<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md4)
        v-select(:items="rarityOptions" v-model="rarityFilter" label="Rarity" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md4)
        v-select(:items="typeOptions" v-model="typeFilter" label="Type" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md4)
        v-select(:items="propertyOptions" v-model="propertyFilter" label="Properties" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import weaponProperties from '~/static/data/weapon_properties.json'
const { mapActions, mapGetters } = createNamespacedHelpers('itemList')

export default {
  props: {
    itemKey: {
      type: String,
      default: ''
    }
  },
  data () {
    const propertyOptions = weaponProperties.map(p => p.name).filter(p => !['Heat', 'Melee', 'Range', 'Weight'].includes(p))
    return {
      typeOptions: ['Assault Rifle', 'Heavy Pistol', 'Heavy Weapon', 'Melee', 'SMG', 'Shotgun', 'Sniper Rifle'],
      propertyOptions
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
    rarityFilter: {
      get () {
        return this.filters[this.itemKey].rarity
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'rarity', value })
      }
    },
    propertyFilter: {
      get () {
        return this.filters[this.itemKey].property
      },
      set (value) {
        this.updateFilter({ key: this.itemKey, filterKey: 'property', value })
      }
    }
  },
  methods: {
    ...mapActions(['updateFilter']),
    reset () {
      this.rarityFilter = []
      this.typeFilter = []
    }
  }
}
</script>
