<template>
  <v-container />
</template>

<script>

export default {
  async beforeCreate () {
    await this.$store.dispatch('auth/LOAD_USER')
    if (!this.$store.state.auth.isAuthenticated) {
      await this.$store.dispatch('auth/LOG_IN')
    } else {
      this.$router.push('/')
    }
  }
}
</script>
