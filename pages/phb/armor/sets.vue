<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#armor" nuxt outline color="secondary") Armor Rules
      v-btn(to="/for-gms/armor-creation" nuxt outline color="secondary") Creating Armor

    // Search functions for large screens
    // Search functions for large screens
    div.mb-5.hidden-sm-and-down
      h2.display-1 Armor Sets
      p.
        An armor set can be one or more pieces of armor.
      ul
        li #[strong Full Set] means the armor consists of Head, Chest, Arms, and Legs pieces of the armor's type (Light, Medium, of Heavy).
        li #[strong Body Armor] consists of a Chest, Arms and Legs pieces of the armor's type (Light, Medium, of Heavy).
      v-alert(:value="true" type="info")
        p.
          To gain the #[strong Set Benefits] from a #[strong Full Set] or #[strong Body Armor], you must be wearing all peices of the set.
          However, you always gain the AC from wearing the individual pieces.
        p.body-2.mb-0 EXAMPLE
        ul
          li Head: Death Mask (Heavy), +2 AC, +1 on melee attack and damage rolls
          li Chest: Blood Dragon Armor (Medium), 2 AC as a Medium Chest Armor Piece, No other benefits (incomplete set)
          li Arms: Blood Dragon Armor (Medium), 1 AC as a Medium Arm Armor Piece, No other benefits (incomplete set)
          li Legs: Cerberus Assault Armor (Heavy), 2 AC as a Heavy Lef Armor Piece, No other benefits (incomplete set)
          li #[strong Total]: 17 AC, +1 on melee attack and damage rolls
      div.hr.mb-0
      v-card(elevation="0")
        v-card-text
          v-layout(row wrap)
            v-flex(xs12)
              v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
            v-flex(xs12)
              armor-set-filters(:itemKey="itemKey" v-bind:noteOptions="noteOptions")

    // List
    armor-set-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Armor Sets")
      template(slot="filters")
        armor-set-filters(:itemKey="itemKey" v-bind:noteOptions="noteOptions")
</template>

<script>
  import ArmorSetFilters from '~/components/armor_set/ArmorSetFilters.vue'
  import ArmorSetList from '~/components/armor_set/ArmorSetList.vue'
  import MobileFilterContainer from '~/components/MobileFilterContainer.vue'
  import items from '~/static/data/armor_sets'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: { ArmorSetFilters, ArmorSetList, MobileFilterContainer },
    data () {
      const noteOptions = new Set()
      for (const item of items) {
        if (item.notes) {
          for (const note of item.notes.split(',').map(n => n.trim())) {
            noteOptions.add(note)
          }
        }
      }
      return {
        items,
        noteOptions: [...noteOptions].sort(),
        itemKey: 'armorSets'
      }
    },
    computed: {
      ...mapGetters(['order', 'sortBy', 'filters', 'searchString']),
      search: {
        get () {
          return this.searchString
        },
        set (value) {
          this.updateSearchString(value)
        }
      },
      filtered () {
        let data = this.items
        let sortBy = this.sortBy.key
        let order = this.order
        data.sort(function (a, b) {
          data.sort(function (a, b) {
            const aSort = sortBy === 'cost' ? parseInt(a[sortBy], 10) : a[sortBy]
            const bSort = sortBy === 'cost' ? parseInt(b[sortBy], 10) : b[sortBy]
            return (aSort === bSort ? 0 : aSort > bSort ? 1 : -1) * order
          })
        })
        if (this.search) {
          data = data.filter((item) => {
            let nameMatch = item.name.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let textMatch = item.notes ? item.notes.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0 : false
            let descMatch = item.description.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let featMatch = item.feature ? item.feature.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0 : false
            return nameMatch || textMatch || descMatch || featMatch
          })
        }
        if (this.filters.armorSets.type.length > 0) {
          data = data.filter(item => this.filters.armorSets.type.includes(item.type))
        }
        if (this.filters.armorSets.armorType.length > 0) {
          data = data.filter(item => this.filters.armorSets.armorType.includes(item.armorType))
        }
        if (this.filters.armorSets.notes.length > 0) {
          data = data.filter(item => {
            if (item.notes) {
              for (const note of item.notes.split(',').map(n => n.trim())) {
                if (this.filters.armorSets.notes.includes(note)) {
                  return item
                }
              }
            }
          })
        }
        return data
      }
    },
    head () {
      return {
        title: 'Pre-made Armor Sets - Equipment | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'These pre-made armor sets are available as cheap alternatives to custom modding.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
