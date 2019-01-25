<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    phb-toolbar(v-if="!searchbar")

    // Search Toolbar
    v-toolbar(light v-if="searchbar").hidden-md-and-up
      v-btn(@click="setSearchbar(false); search = ''" icon) #[v-icon arrow_back]
      v-text-field(v-model="search" single-line full-width hide-details label="Search")

    // Jump Links
    v-navigation-drawer(v-model="rulebarVisible" fixed right clipped app width="225" mobile-break-point="960" v-if="page.rules")
      v-list(dense)
        v-subheader Jump to
        v-list-tile(ripple v-for="(rule, index) in rules" v-bind:key="index" v-on:click="goToRule(`#${rule.hash}`)")
          v-list-tile-content
            v-list-tile-title {{ rule.title }}
          v-chip(v-if="rule.new" color="secondary" text-color="white" disabled).pa-0.v-chip--x-small new
          v-chip(v-if="rule.change" color="orange accent-2" text-color="black" disabled).pa-0.v-chip--x-small change

    // Content
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Manual
      nuxt
</template>

<script>
import SideNavigation from '~/components/SideNavigation.vue'
import PhbToolbar from '~/components/PhbToolbar.vue'
import rules from '~/static/data/rules'

// State
import {createNamespacedHelpers} from 'vuex'
const {mapActions, mapGetters} = createNamespacedHelpers('phb')

export default {
  components: {
    PhbToolbar,
    SideNavigation
  },
  computed: {
    ...mapGetters(['pages', 'searchString', 'rulebar', 'searchbar']),
    page () {
      return this.pages[this.$route.name] ? this.pages[this.$route.name] : {}
    },
    rules () {
      return rules.filter(rule => rule.section === this.page.rules)
    },
    search: {
      get () {
        return this.searchString
      },
      set (value) {
        this.updateSearchString(value)
      }
    },
    rulebarVisible: {
      get () {
        return this.rulebar
      },
      set (value) {
        this.setRulebar(value)
      }
    }
  },
  created () {
    this.search = ''
    this.rulebarVisible = this.$vuetify.breakpoint.mdAndUp
    this.setSearchbar(false)
  },
  methods: {
    ...mapActions(['updateSearchString', 'setRulebar', 'setSearchbar']),
    goToRule (rule) {
      this.$vuetify.goTo(rule, { offset: -58 })
      if (this.$vuetify.breakpoint.smAndDown) {
        this.rulebarVisible = false
      }
    }
  }
}
</script>
