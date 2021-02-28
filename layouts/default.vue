<template lang="pug">
  v-app(toolbar)
    me-version-snackbar
    main-toolbar(navBrand primaryNavigation)
    nuxt
    main-footer
</template>

<script>
  import MainToolbar from '~/components/MainToolbar.vue'
  import MainFooter from '~/components/MainFooter.vue'
  import MeVersionSnackbar from "../components/MeVersionSnackbar";

  export default {
    components: {
      MeVersionSnackbar,
      MainFooter,
      MainToolbar
    }
  }
</script>
