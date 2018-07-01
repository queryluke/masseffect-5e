<template lang="pug">
  v-app(toolbar)
    h1.sr-only Mass Effect 5e - Player's Handbook
    side-navigation

    // Main toolbar
    main-toolbar(v-if="!searchActive")
      h2(slot="toolbarTitle").title Spells
      template(slot="toolbarItems")
        v-btn(icon @click="searchActive = true") #[v-icon search]
        v-btn(icon @click="")  #[v-icon filter_list]

    // Search Toolbar
    v-toolbar(light v-if="searchActive").hidden-md-and-up
      v-btn(@click="searchActive = false" icon) #[v-icon arrow_back]
      v-text-field(v-model="searchString" single-line full-width hide-details label="Search")

    // Content
    v-content.blue-grey.lighten-4
      v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

        // Search functions for large screens
        div.hidden-sm-and-down
          div.text-xs-center #[h2 Spells]
          v-layout(row wrap)
            v-flex(xs12) this is where the class filter will go
            v-flex(xs12 sm6 d-flex)
              v-layout(row)
                v-flex
                  v-checkbox(label="Biotic" v-model="spellFilter" value="biotic" color="purple darken-4")
                v-flex
                  v-checkbox(label="Tech" v-model="spellFilter" value="tech" color="orange darken-4")
                v-flex
                  v-checkbox(label="Combat" v-model="spellFilter" value="combat" color="primary")

        // Spell List
        spell-expansion-list(:spells="filtered")

    // Mobile Search filters
</template>

<script>
  import MainToolbar from '~/components/MainToolbar.vue'
  import SideNavigation from '~/components/SideNavigation.vue'
  import SpellExpansionList from '~/components/spell/SpellExpansionList.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      MainToolbar,
      SideNavigation,
      SpellExpansionList
    },
    computed: {
      ...mapGetters(['getData']),
      filtered () {
        let data = this.items
        if (this.search) {
          data = data.filter((spell) => {
            let nameMatch = spell.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let textMatch = spell.mechanic_text_dump.indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || textMatch
          })
        }
        if (this.spellFilter.length > 0) {
          data = data.filter(spell => this.spellFilter.includes(spell.type))
        }
        return data
      }
    },
    created () {
      this.items = this.getData(this.listName).sort((a, b) => a.name > b.name ? 1 : -1)
    },
    data () {
      return {
        searchActive: false,
        items: [],
        listName: 'spells',
        searchString: '',
        sortKey: 'name',
        sortOrder: 1,
        spellFilter: [],
        searchBar: false,
        pageName: 'Spells'
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
    layout: 'cyo',
    methods: {
      sortBy (key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder * -1
        } else {
          this.sortKey = key
          this.sortOrder = 1
        }
      },
      hideSearch () {
        this.searchActive = false
      }
    }
  }
</script>
