<template lang="pug">
  v-content
    v-container(fill-height)
      v-layout(fill-height).text-xs-center
        v-flex(xs12)
          h1(v-if="error.statusCode === 404").display-1 Page Not Found
          v-btn(to="/").primary Return Home
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
