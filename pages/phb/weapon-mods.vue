<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#mods" nuxt outline color="secondary") Weapon Mod Rules

    // Search functions for large screens
    div.mb-5.hidden-sm-and-down
      h2.display-1 Weapon Mods
      div.hr.mb-0
      v-card(elevation="0")
        v-card-text
          v-layout(row wrap)
            v-flex(xs12)
              v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
            v-flex(xs12)
              weapon-mod-filters(:itemKey="itemKey" v-bind:noteOptions="noteOptions")

    // List
    weapon-mod-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Weapon Mods")
      template(slot="filters")
        weapon-mod-filters(:itemKey="itemKey" v-bind:noteOptions="noteOptions")

</template>

<script>
  import WeaponModFilters from '~/components/weapon_mod/WeaponModFilters.vue'
  import WeaponModList from '~/components/weapon_mod/WeaponModList.vue'
  import MobileFilterContainer from '~/components/MobileFilterContainer.vue'
  import items from '~/static/data/weapon_mods'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: { WeaponModFilters, WeaponModList, MobileFilterContainer },
    data () {
      const noteOptions = new Set()
      for (const item of items) {
        for (const note of item.notes.split(',').map(n => n.trim())) {
          noteOptions.add(note)
        }
      }
      return {
        items,
        noteOptions: [...noteOptions].sort(),
        itemKey: 'weaponMods'
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
          const aSort = sortBy === 'cost' ? parseInt(a[sortBy], 10) : a[sortBy]
          const bSort = sortBy === 'cost' ? parseInt(b[sortBy], 10) : b[sortBy]
          return (aSort === bSort ? 0 : aSort > bSort ? 1 : -1) * order
        })
        if (this.search) {
          data = data.filter((item) => {
            let nameMatch = item.name.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let textMatch = item.notes.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let descMatch = item.description.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let featMatch = item.feature.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            return nameMatch || textMatch || descMatch || featMatch
          })
        }
        if (this.filters.weaponMods.placement.length > 0) {
          data = data.filter(item => this.filters.weaponMods.placement.includes(item.placement))
        }
        if (this.filters.weaponMods.rarity.length > 0) {
          data = data.filter(item => this.filters.weaponMods.rarity.includes(item.rarity))
        }
        if (this.filters.weaponMods.weaponType.length > 0) {
          console.log(this.filters.weaponMods.weaponType)
          data = data.filter(item => {
            for (const type of item.availability) {
              if (this.filters.weaponMods.weaponType.includes(type)) {
                return item
              }
            }
          })
        }
        if (this.filters.weaponMods.notes.length > 0) {
          data = data.filter(item => {
            for (const note of item.notes.split(',').map(n => n.trim())) {
              if (this.filters.weaponMods.notes.includes(note)) {
                return item
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
        title: 'Weapon Mods - Equipment | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with a full set of weapon  mods that let you customize your weapon to your needs.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
