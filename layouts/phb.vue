<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    phb-toolbar(v-if="!searchActive" v-bind:clippedRight="typeof page.rules !== 'undefined'")
      template(slot="toolbarItems")
        v-btn(icon @click="searchActive = true" v-if="page.list") #[v-icon search]
        v-btn(icon @click="toggleMobileFilterDialog" v-if="page.list")  #[v-icon filter_list]
        v-btn(icon dark @click="ruleList = !ruleList" v-if="page.rules") #[v-icon view_list]

    // Search Toolbar
    v-toolbar(light v-if="searchActive").hidden-md-and-up
      v-btn(@click="searchActive = false; search = ''" icon) #[v-icon arrow_back]
      v-text-field(v-model="search" single-line full-width hide-details label="Search")

    // Jump Links
    v-navigation-drawer(v-model="ruleList" fixed right clipped app width="225" mobile-break-point="960" v-if="page.rules")
      v-list(dense)
        v-subheader Jump to
        v-list-tile(ripple v-for="(rule, index) in rules" v-bind:key="index" v-on:click="goToRule(`#${rule.hash}`)")
          v-list-tile-content
            v-list-tile-title {{ rule.title }}
          v-chip(v-if="rule.new" color="secondary" text-color="white" disabled).pa-0.v-chip--x-small new
          v-chip(v-if="rule.change" color="orange accent-2" text-color="black" disabled).pa-0.v-chip--x-small change

    // Content
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Handbook
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
    ...mapGetters(['pages', 'searchString']),
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
    }
  },
  created () {
    this.search = ''
  },
  data () {
    return {
      searchActive: false,
      ruleList: this.$vuetify.breakpoint.mdAndUp
    }
  },
  methods: {
    ...mapActions(['updateSearchString', 'toggleMobileFilterDialog']),
    goToRule (rule) {
      this.$vuetify.goTo(rule, { offset: -58 })
      if (this.$vuetify.breakpoint.smAndDown) {
        this.ruleList = false
      }
    }
  }
}
</script>