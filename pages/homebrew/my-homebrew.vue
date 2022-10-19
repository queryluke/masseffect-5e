<template>
  <v-container>
    <div v-if="!isAuthenticated">
      <p>
        You must sign in to view, edit, and create homebrew
      </p>
      <v-btn @click="$store.dispatch('auth/LOG_IN', $nuxt.$route.path)">
        Sign In
      </v-btn>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <me-page-title />
        </v-col>
        <v-col class="text-right">
          <v-btn large to="/homebrew" exact>
            Community Homebrew
          </v-btn>
          <v-btn large color="primary" @click="createNewDialog = true">
            Create
          </v-btn>
        </v-col>
      </v-row>
      <me-homebrew-create-dialog :shown="createNewDialog" @close="createNewDialog = false" />
      <me-homebrew-table mine />
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      createNewDialog: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: 'My Homebrew',
      description: 'Community created homebrew'
    })
  }
}
</script>
