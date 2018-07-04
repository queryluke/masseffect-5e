<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    phb-toolbar
      template(slot="toolbarItems")
        v-btn(icon dark @click="ruleList = !ruleList") #[v-icon view_list]

    // Jump Links
    v-navigation-drawer(v-model="ruleList" fixed right clipped app width="200" mobile-break-point="960")
      v-list(dense)
        v-subheader Jump to
        v-list-tile(ripple v-for="(rule, index) in rules[current]" v-bind:key="index" v-on:click="goToRule(`#${rule}`)")
          v-list-tile-title {{ rule.replace(/-/g,' ') | capitalize }}

    // Content
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Handbook
      nuxt
</template>

<script>
import SideNavigation from '~/components/SideNavigation.vue'
import MainFooter from '~/components/MainFooter.vue'
import PhbToolbar from '~/components/PhbToolbar.vue'

// State
import {mapGetters} from 'vuex'

export default {
  components: {
    PhbToolbar,
    SideNavigation,
    MainFooter
  },
  computed: {
    ...mapGetters(['pageTitle', 'pageRules']),
    ...mapGetters('rules', {
      rules: 'rules',
      current: 'current'
    })
  },
  created () {
    console.log(this.rules['general'])
  },
  data () {
    return {
      ruleList: this.$vuetify.breakpoint.mdAndUp
    }
  },
  methods: {
    goToRule (rule) {
      this.$vuetify.goTo(rule, { offset: -58 })
      if (this.$vuetify.breakpoint.smAndDown) {
        this.ruleList = false
      }
    }
  }
}
</script>