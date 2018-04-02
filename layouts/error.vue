<template lang="pug">
  v-content
    v-layout(fill-height)
      h1(v-if="error.statusCode === 404") Page Not Found
      nuxt-link(to="/") Home Page
</template>

<script>
import MainToolbar from '~/components/MainToolbar.vue'
import MainFooter from '~/components/MainFooter.vue'

export default {
  components: {
    MainFooter,
    MainToolbar
  },
  props: ['error']
}
</script>
