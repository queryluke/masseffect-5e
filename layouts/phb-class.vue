<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    v-toolbar(dark fixed app clipped-left tabs)
      v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
      v-toolbar-title
        nuxt-link(to="/").nav-brand.hidden-sm-and-down
          img(src="/images/me5e.svg")
          span Mass Effect 5e
        span.hidden-md-and-up Class - {{ $route.params.id | capitalize }}
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route" flat)
          span {{ item.title }}
      v-tabs(slot="extension" v-model="activeTab" color="grey darken-4" show-arrows v-bind:slider-color="sliderColor" grow).hidden-md-and-up
        v-tab(v-for="tab in tabs" v-bind:key="tab.id" v-bind:href="`#${tab.id}`" ripple) {{ tab.name }}

    // Content
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Handbook
      nuxt
</template>

<script>
import SideNavigation from '~/components/SideNavigation.vue'
import PhbToolbar from '~/components/PhbToolbar.vue'

// State
import {createNamespacedHelpers} from 'vuex'
const {mapActions, mapGetters} = createNamespacedHelpers('classPage')

export default {
  components: {
    PhbToolbar,
    SideNavigation
  },
  computed: {
    ...mapGetters(['active', 'tabs', 'primaryNavigation', 'colors']),
    activeTab: {
      get () {
        return this.active
      },
      set (value) {
        this.setActiveTab(value)
      }
    },
    sliderColor () {
      return this.colors[this.$route.params.id] ? this.colors[this.$route.params.id].primary : 'primary'
    }
  },
  methods: {
    ...mapActions(['setActiveTab', 'toggleSidebar'])
  }
}
</script>

<style>
  @media(min-width: 960px) {
    .v-toolbar__extension {
      height: 0px !important;
    }
    .v-content {
      padding-top: 64px !important
    }
    .v-navigation-drawer {
      margin-top: 64px !important;
      max-height: calc(100% - 64px) !important;
    }
  }
</style>