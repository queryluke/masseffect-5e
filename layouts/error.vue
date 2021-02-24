<template>
  <v-container>
    <v-parallax src="/images/parallax/critical_mission_failure.jpg" />
    <v-btn to="/manual/intro" nuxt>
      Resume
    </v-btn>
  </v-container>
</template>

<script>

export default {
  props: {
    error: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
