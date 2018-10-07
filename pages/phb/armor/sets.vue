<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Armor Sets
      p.
        Pre-made armor sets are cheaper than creating a full set of custom armor. However, they cannot be customized or upgraded
        in any way. To learn about creating additional armor sets, read the #[nuxt-link(to="/for-gms/armor-creation") Creating Armor guide].
      p.
        An armor set can be one or more pieces of armor. "Full Set" means the armor consists of Head, Chest, Arms, and Legs pieces.
        "Body Armor" consists of a Chest, Arms and Legs piece. To gain the benefits from a Full Set or Body Armor, you must be wearing all peices of the set.
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
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Pre-made Armor Sets',
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
