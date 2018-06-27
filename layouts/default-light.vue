<template lang="pug">
  v-app(toolbar)
    main-toolbar
    side-navigation(v-if="$vuetify.breakpoint.mdAndDown")
    nuxt
    main-footer
</template>

<script>
  import MainToolbar from '~/components/MainToolbar.vue'
  import MainFooter from '~/components/MainFooter.vue'
  import SideNavigation from '~/components/SideNavigation.vue'

  export default {
    components: {
      MainFooter,
      MainToolbar,
      SideNavigation
    }
  }
</script>
