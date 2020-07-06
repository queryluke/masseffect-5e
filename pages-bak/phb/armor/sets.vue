<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#armor" nuxt outline color="secondary") Armor Rules
      v-btn(to="/for-gms/armor-creation" nuxt outline color="secondary") Creating Armor

    // Search functions for large screens
    div.mb-5.hidden-sm-and-down
      h2.display-1 Armor Sets
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
import { createNamespacedHelpers } from 'vuex'
import ArmorSetFilters from '~/components/armor_set/ArmorSetFilters.vue'
import ArmorSetList from '~/components/armor_set/ArmorSetList.vue'
import MobileFilterContainer from '~/components/MobileFilterContainer.vue'
import items from '~/static/data/armor_sets'

// State
const { mapActions, mapGetters } = createNamespacedHelpers('itemList')

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
      const sortBy = this.sortBy.key
      const order = this.order
      data.sort(function (a, b) {
        const aSort = sortBy === 'cost' ? parseInt(a[sortBy], 10) : a[sortBy]
        const bSort = sortBy === 'cost' ? parseInt(b[sortBy], 10) : b[sortBy]
        return (aSort === bSort ? 0 : aSort > bSort ? 1 : -1) * order
      })
      if (this.search) {
        data = data.filter((item) => {
          const nameMatch = item.name.toLowerCase().includes(this.searchString.toLowerCase())
          const textMatch = item.notes ? item.notes.toLowerCase().includes(this.searchString.toLowerCase()) : false
          const descMatch = item.description.toLowerCase().includes(this.searchString.toLowerCase())
          const featMatch = item.feature ? item.feature.toLowerCase().includes(this.searchString.toLowerCase()) : false
          return nameMatch || textMatch || descMatch || featMatch
        })
      }
      if (this.filters.armorSets.type.length > 0) {
        data = data.filter(item => this.filters.armorSets.type.includes(item.type))
      }
      if (this.filters.armorSets.armorType.length > 0) {
        data = data.filter(item => this.filters.armorSets.armorType.includes(item.armorType))
      }
      if (this.filters.armorSets.rarity.length > 0) {
        data = data.filter(item => this.filters.armorSets.rarity.includes(item.rarity))
      }
      if (this.filters.armorSets.notes.length > 0) {
        data = data.filter((item) => {
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
  middleware: 'resetListFilters',
  head () {
    return {
      title: 'Armor Sets - Equipment | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'These pre-made armor pieces are available as mass produced alternatives to custom modding.' }
      ]
    }
  },
  layout: 'phb',
  methods: {
    ...mapActions(['updateSearchString'])
  }
}
</script>
