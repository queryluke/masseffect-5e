<template lang="pug">
  v-app(toolbar)

    // Side Navigation
    side-navigation

    // Main toolbar
    phb-toolbar

    // Content
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Handbook
      nuxt
</template>

<script>
import SideNavigation from '~/components/SideNavigation.vue'
import PhbToolbar from '~/components/PhbToolbar.vue'

export default {
  components: {
    PhbToolbar,
    SideNavigation
  }
}
</script>