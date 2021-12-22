<template>
  <v-container>
    <me-page-title />
    Email: {{ attributes.email }}
  </v-container>
</template>

<script>

export default {
  computed: {
    attributes () {
      const { attributes } = this.$store.state.auth.cognitoUser
      return attributes
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: 'Profile'
    })
  }
}
</script>
