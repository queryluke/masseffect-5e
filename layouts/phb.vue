<template lang="pug">
  v-app(toolbar)
    phb-navigation
    main-toolbar
    v-content
      v-container(fluid fill-height).blue-grey.lighten-4
        h1.sr-only Mass Effect 5e - Player's Handbook
        nuxt
    global-dialog
</template>

<script>
import PhbNavigation from '~/components/phb/PhbNavigation.vue'
import MainFooter from '~/components/MainFooter.vue'
import MainToolbar from '~/components/MainToolbar.vue'
import GlobalDialog from '~/components/GlobalDialog.vue'

export default {
  components: {
    GlobalDialog,
    MainToolbar,
    PhbNavigation,
    MainFooter
  },
  data () {
    return {
      drawer: true
    }
  }
}
</script>