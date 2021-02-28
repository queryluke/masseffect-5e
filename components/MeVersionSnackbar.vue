<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="0"
    bottom
    dark
  >
    <v-btn
      color="white"
      flat
      class="ml-0"
      @click="closeSnackbar"
    >
      <v-icon>close</v-icon>
    </v-btn>
    You are viewing an older version of Mass Effect 5e
    <v-btn
      color="light-blue"
      flat
      href="https://n7.world/"
    >
      Latest release
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
