<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Spells
      v-layout(row wrap)
        v-flex(md4).px-1
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-flex(md8).px-1
          spell-filters

    // Spell List
    spell-expansion-list(:spells="filtered")

    // Mobile Filters
    mobile-filter-container
      template(slot="filters")
        spell-filters
</template>

<script>
  import SpellExpansionList from '~/components/spell/SpellExpansionList.vue'
  import SpellFilters from '~/components/spell/SpellFilters.vue'
  import MobileFilterContainer from '~/components/MobileFilterContainer.vue'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('spellList')

  export default {
    components: {
      MobileFilterContainer,
      SpellExpansionList,
      SpellFilters
    },
    computed: {
      ...mapGetters(['spells', 'order', 'sortBy', 'type', 'availableClasses', 'searchString']),
      search: {
        get () {
          return this.searchString
        },
        set (value) {
          this.updateSearchString({value})
        }
      },
      filtered () {
        let data = this.spells
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
        if (this.searchString) {
          data = data.filter((spell) => {
            let nameMatch = spell.name.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let textMatch = spell.mechanic_text_dump.indexOf(this.searchString.toLowerCase()) >= 0
            return nameMatch || textMatch
          })
        }
        if (this.type.length > 0) {
          data = data.filter(spell => this.type.includes(spell.type))
        }
        if (this.availableClasses.length > 0) {
          data = data.filter(spell => {
            for (const c of this.availableClasses) {
              if (spell[c]) {
                return spell
              }
            }
          })
        }
        return data
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
    layout: 'phb-list',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
