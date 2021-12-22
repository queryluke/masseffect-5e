<template>
  <v-container />
</template>

<script>

export default {
  async beforeCreate () {
    await this.$store.dispatch('auth/LOG_OUT')
    this.$router.push(this.$store.state.auth.redirect || '/')
  }
}
</script>
