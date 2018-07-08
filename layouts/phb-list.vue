<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    phb-toolbar(v-if="!searchActive")
      template(slot="toolbarItems")
        v-btn(icon @click="searchActive = true") #[v-icon search]
        v-btn(icon @click="toggleMobileFilterDialog")  #[v-icon filter_list]

    // Search Toolbar
    v-toolbar(light v-if="searchActive").hidden-md-and-up
      v-btn(@click="searchActive = false; search = ''" icon) #[v-icon arrow_back]
      v-text-field(v-model="search" single-line full-width hide-details label="Search")

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
const {mapActions, mapGetters} = createNamespacedHelpers('phb')

export default {
  components: {
    PhbToolbar,
    SideNavigation
  },
  computed: {
    ...mapGetters(['searchString']),
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
      searchActive: false
    }
  },
  methods: {
    ...mapActions(['updateSearchString', 'toggleMobileFilterDialog'])
  }
}
</script>