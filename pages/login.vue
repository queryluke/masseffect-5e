<template>
  <v-container />
</template>

<script>

export default {
  async beforeCreate () {
    await this.$store.dispatch('auth/LOAD_USER')
    this.$router.push(this.$store.state.auth.redirect || '/profile')
  }
}
</script>
