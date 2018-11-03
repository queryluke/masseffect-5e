<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Spells
      p #[nuxt-link(to="/phb/rules/spellcasting") Spellcasting Rules]
      v-layout(row wrap)
        v-flex(md4).px-1
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-flex(md8).px-1
          spell-filters(:itemKey="itemKey")

    // Spell List
    spell-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Spells")
      template(slot="filters")
        spell-filters(:itemKey="itemKey")
</template>

<script>
  import SpellList from '~/components/spell/SpellList.vue'
  import SpellFilters from '~/components/spell/SpellFilters.vue'
  import MobileFilterContainer from '~/components/MobileFilterContainer.vue'
  import items from '~/static/data/spells'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: {
      MobileFilterContainer,
      SpellList,
      SpellFilters
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
          switch (sortBy) {
            case 'type':
              if (a[sortBy] === b[sortBy]) {
                if (a.level === b.level) {
                  return (a.name > b.name ? 1 : -1) * order
                } else {
                  return (a.level > b.level ? 1 : -1) * order
                }
              } else {
                return (a[sortBy] > b[sortBy] ? 1 : -1) * order
              }
            default:
              return (a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? 1 : -1) * order
          }
        })
        if (this.search) {
          data = data.filter((spell) => {
            let nameMatch = spell.name.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            return nameMatch
          })
        }
        if (this.filters.spells.type.length > 0) {
          data = data.filter(spell => this.filters.spells.type.includes(spell.type))
        }
        if (this.filters.spells.availableClasses.length > 0) {
          data = data.filter(spell => {
            for (const c of this.filters.spells.availableClasses) {
              if (spell.availableClasses.includes(c)) {
                return spell
              }
            }
          })
        }
        return data
      }
    },
    data () {
      return {
        items,
        itemKey: 'spells'
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Biotics, Tech and Combat Powers',
        meta: [
          { hid: 'description', name: 'description', content: 'Dozens of unique and re-skinned D&D spells are available as Biotic, Tech, and Combat powers' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
