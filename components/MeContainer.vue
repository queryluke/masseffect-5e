<template>
  <v-container v-if="!loading">
    <slot />
  </v-container>
</template>

<script>
export default {
  name: 'MeContainer',
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
