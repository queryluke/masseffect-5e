<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/critical_mission_failure.jpg")
    section(style="margin-top: -50px;")
      v-container
        v-layout(column wrap align-center)
          v-flex(xs12 sm10 md8)
            div.text-xs-center
              h1(v-if="error.statusCode === 404").display-1 Page Not Found
              v-btn(to="/").primary Resume
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
