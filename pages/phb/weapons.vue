<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Weapons
      v-layout(row wrap)
        v-flex(md4).px-1
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-flex(md8).px-1
          weapon-filters

    // List
    weapon-expansion-list(:weapons="filtered")

    // Mobile Filters
    mobile-filter-container
      template(slot="filters")
        weapon-filters
</template>

<script>
  import WeaponExpansionList from '~/components/weapon/WeaponExpansionList.vue'
  import WeaponFilters from '~/components/weapon/WeaponFilters.vue'
  import MobileFilterContainer from '~/components/MobileFilterContainer.vue'
  import {AverageFromDie} from '~/mixins/averageFromDie'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('weaponList')

  export default {
    components: {
      MobileFilterContainer,
      WeaponExpansionList,
      WeaponFilters
    },
    computed: {
      ...mapGetters(['weapons', 'order', 'sortBy', 'type', 'rarity', 'searchString']),
      search: {
        get () {
          return this.searchString
        },
        set (value) {
          this.updateSearchString({value})
        }
      },
      filtered () {
        let data = this.weapons
        let sortBy = this.sortBy.key
        let order = this.order
        let self = this
        data.sort(function (a, b) {
          switch (sortBy) {
            case 'type':
            case 'name':
              a = a[sortBy]
              b = b[sortBy]
              break
            case 'damage':
              a = self.averageFromDie(a.damage)
              b = self.averageFromDie(b.damage)
              break
            default:
              a = a[sortBy] ? parseInt(a[sortBy].replace(/\D/, ''), 10) : 0
              b = b[sortBy] ? parseInt(b[sortBy].replace(/\D/, ''), 10) : 0
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
        if (this.searchString) {
          data = data.filter((weapon) => {
            let nameMatch = weapon.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let typeMatch = weapon.type.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let noteMatch = weapon.notes_text_dump.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || typeMatch || noteMatch
          })
        }
        if (this.rarity.length > 0) {
          data = data.filter(weapon => this.rarity.includes(weapon.rarity))
        }
        if (this.type.length > 0) {
          data = data.filter(weapon => this.type.includes(weapon.type))
        }
        return data
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Weapons',
        meta: [
          { hid: 'description', name: 'description', content: 'The Mass Effect 5e arsenal has over 80 unique weapons designed to match the game\'s weaponry' }
        ]
      }
    },
    layout: 'phb-list',
    methods: {
      ...mapActions(['updateSearchString'])
    },
    mixins: [AverageFromDie]
  }
</script>
