<template lang="pug">
  v-app(toolbar)
    main-toolbar
    v-content
      v-container
        v-layout(row wrap)
          v-flex(xs12)
            nuxt
          v-flex(xs12)
            v-btn(to="/news" nuxt).primary
              v-icon keyboard_arrow_left
              span Back to news
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
