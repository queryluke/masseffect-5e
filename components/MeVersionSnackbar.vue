<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="-1"
    bottom
    dark
  >
    <v-btn
      color="white"
      text
      class="ml-0"
      @click="closeSnackbar"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    You are viewing an older version of Mass Effect 5e
    <v-btn
      color="light-blue"
      text
      href="https://www.n7.world"
    >
      View
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar () {
      return this.$store.getters.versionSnackbar
    }
  },
  methods: {
    closeSnackbar () {
      this.$store.commit('closeVersionSnackbar')
    }
  }
}
</script>
