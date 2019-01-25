<template lang="pug">
  v-toolbar(dark fixed app
    clipped-left
    v-bind:clippedRight="typeof page.rules !== 'undefined'"
    v-bind:tabs="classPage"
  )
    v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
    // Race mobile display
    v-menu(:nudge-width="100" v-if="$vuetify.breakpoint.smAndDown && toolbarMenuItems")
      v-toolbar-title(slot="activator")
        span {{ pageName }}
        v-icon arrow_drop_down
      v-list
        v-list-tile(v-for="item in toolbarMenuItems" v-bind:key="item" v-bind="{to: { name: $route.name, params: { id: item }}}")
          v-list-tile-title {{ item | fidtt }}
    // All other mobile displays
    v-toolbar-title(v-else)
      nuxt-link(to="/").nav-brand.hidden-sm-and-down
        img(src="/images/me5e.svg")
        span Mass Effect 5e
      span.hidden-md-and-up {{ pageName }}

    v-spacer

    // Additional Toolbar items
    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}

    // Tabs
    v-tabs(v-if="classPage" slot="extension" v-model="classTab" color="grey darken-4"
            slider-color="white" id="mobileTabs" grow show-arrows).hidden-md-and-up
      v-tab(v-for="tab in classTabs" v-bind:key="tab.id" v-bind:href="`#${tab.id}`" ripple) {{ tab.name }}

    span.hidden-md-and-up
      v-btn(icon @click="setSearchbar(true)" v-if="page.list") #[v-icon search]
      v-btn(icon @click="toggleMobileFilterDialog" v-if="page.list")  #[v-icon filter_list]
      v-btn(icon dark @click="toggleRulebar" v-if="page.rules") #[v-icon view_list]
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('phb')

  export default {
    computed: {
      ...mapGetters(['pages', 'primaryNavigation', 'races', 'classes', 'activeClassTab', 'classTabs', 'searchbar']),
      classTab: {
        get () {
          return this.activeClassTab
        },
        set (value) {
          this.updateActiveClassTab(value)
        }
      },
      page () {
        return this.pages[this.$route.name] ? this.pages[this.$route.name] : {}
      },
      pageName () {
        const fancyParam = this.$route.params.id === 'unshackled-ai' ? 'Unshackled AI' : this.$options.filters.capitalize(this.$route.params.id)
        if (this.pages[this.$route.name]) {
          return this.$route.params.id
            ? `${this.page.name} - ${fancyParam}`
            : this.page.name
        } else {
          return ''
        }
      },
      classPage () {
        return this.$route.name === 'phb-classes-id'
      },
      racePage () {
        return this.$route.name === 'phb-races-id'
      },
      toolbarMenuItems () {
        if (this.classPage) {
          return this.classes
        }
        if (this.racePage) {
          return this.races
        }
        return false
      }
    },
    methods: {
      ...mapActions(['toggleSidebar','updateActiveClassTab', 'toggleRulebar', 'toggleMobileFilterDialog', 'setSearchbar'])
    }
  }
</script>
