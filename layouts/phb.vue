<template lang="pug">
  v-app(toolbar)
    side-navigation
    main-toolbar
    v-content.blue-grey.lighten-4
      h1.sr-only Mass Effect 5e - Player's Handbook
      nuxt
    global-dialog
</template>

<script>
import SideNavigation from '~/components/SideNavigation.vue'
import MainFooter from '~/components/MainFooter.vue'
import MainToolbar from '~/components/MainToolbar.vue'
import GlobalDialog from '~/components/GlobalDialog.vue'

export default {
  components: {
    GlobalDialog,
    MainToolbar,
    SideNavigation,
    MainFooter
  },
  data () {
    return {
      drawer: true
    }
  }
}
</script>