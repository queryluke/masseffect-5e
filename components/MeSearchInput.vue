<template>
  <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Search Everything"
    clearable
    @keyup.enter="submit"
  />
</template>

<script>
export default {
  computed: {
    search: {
      get () {
        return this.$store.getters['user/search']
      },
      set (value) {
        this.$store.commit('user/SET_SEARCH', value)
      }
    }
  },
  methods: {
    submit () {
      this.$router.push({
        path: '/search'
      })
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.isActive = false
      }
    }
  }
}
</script>
