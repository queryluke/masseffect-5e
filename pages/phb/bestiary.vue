<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Bestiary
      v-layout(row wrap)
        v-flex(md4).px-1
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-flex(md8).px-1
          bestiary-filters(:itemKey="itemKey" v-bind:crOptions="crOptions" v-bind:unitOptions="unitOptions")

    // Spell List
    bestiary-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Monsters")
      template(slot="filters")
        bestiary-filters(:itemKey="itemKey" v-bind:crOptions="crOptions" v-bind:unitOptions="unitOptions")
</template>

<script>
  import BestiaryList from '~/components/bestiary/BestiaryList.vue'
  import BestiaryFilters from '~/components/bestiary/BestiaryFilters.vue'
  import MobileFilterContainer from '~/components/list/MobileFilterContainer.vue'
  import items from '~/static/data/bestiary'
  import {CrToInt} from '~/mixins/crToInt'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: {
      BestiaryList,
      BestiaryFilters,
      MobileFilterContainer
    },
    mixins: [CrToInt],
    data () {
      return {
        items,
        itemKey: 'monsters'
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
        data.sort((a, b) => {
          switch (sortBy) {
            case 'cr':
              a = this.crToInt(a[sortBy])
              b = this.crToInt(b[sortBy])
              break
            default:
              a = a[sortBy]
              b = b[sortBy]
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
        if (this.search) {
          data = data.filter((monster) => {
            let nameMatch = monster.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let unitMatch = monster.unit.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || unitMatch
          })
        }
        for (const key in this.filters[this.itemKey]) {
          const filter = this.filters[this.itemKey][key]
          if (filter.length > 0) {
            data = data.filter(item => filter.includes(item[key]))
          }
        }
        return data
      }
    },
    created () {
      const self = this
      const crOptions = new Set()
      const unitOptions = new Set()
      for (const item of this.items) {
        crOptions.add(item.cr)
        unitOptions.add(item.unit)
      }
      this.crOptions = [...crOptions].sort((a, b) => {
        const aSort = self.crToInt(a)
        const bSort = self.crToInt(b)
        return aSort === bSort ? 0 : aSort > bSort ? 1 : -1
      })
      this.unitOptions = [...unitOptions].sort()
    },
    head () {
      return {
        title: 'Bestiary | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Give your player\'s a unique challenge with over 100 custom made Mass Effect enemies! ' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
