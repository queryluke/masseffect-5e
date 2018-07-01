<template lang="pug">
  v-app(toolbar dark)
    main-toolbar(navBrand primaryNavigation)
    nuxt
    main-footer
</template>

<script>
import MainToolbar from '~/components/MainToolbar.vue'
import MainFooter from '~/components/MainFooter.vue'

export default {
  components: {
    MainFooter,
    MainToolbar
  }
}
</script>
