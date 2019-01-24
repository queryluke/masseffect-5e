<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    v-toolbar(dark fixed app clipped-left tabs)
      v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
      v-toolbar-title(v-if="$vuetify.breakpoint.mdAndUp")
        nuxt-link(to="/").nav-brand
          img(src="/images/me5e.svg")
          span Mass Effect 5e
      v-menu(:nudge-width="100" v-if="$vuetify.breakpoint.smAndDown")
        v-toolbar-title(slot="activator")
          span Class - {{ $route.params.id | capitalize }}
          v-icon arrow_drop_down
        v-list
          v-list-tile(v-for="item in classes" v-bind:key="item" v-bind="{to: { name: 'phb-classes-id', params: { id: item }}}")
            v-list-tile-title {{ item | capitalize }}
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route" flat)
          span {{ item.title }}
      v-tabs(slot="extension" v-model="activeTab" color="grey darken-4" slider-color="white" id="mobileTabs" grow show-arrows).hidden-md-and-up
        v-tab(v-for="tab in tabs" v-bind:key="tab.id" v-bind:href="`#${tab.id}`" ripple) {{ tab.name }}

    // Content
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Manual
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
    ...mapGetters(['active', 'tabs', 'primaryNavigation', 'colors', 'classes']),
    activeTab: {
      get () {
        return this.active
      },
      set (value) {
        this.setActiveTab(value)
      }
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
  #mobileTabs .v-tabs__item:not(.v-tabs__item--active) {
    color: #fff
  }
</style>
