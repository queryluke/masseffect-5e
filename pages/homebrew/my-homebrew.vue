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
      <v-card flat>
        <v-toolbar flat>
          <v-tabs v-model="tab">
            <v-tab>My Creations</v-tab>
            <v-tab>My Collection</v-tab>
          </v-tabs>
        </v-toolbar>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <me-homebrew-table mine />
            </v-tab-item>
            <v-tab-item>
              <me-homebrew-table collection />
              <v-alert type="info" class="my-5">
                Items in your collection will show up throughout the site (for your account only) and can be used on your character sheets.
                <strong>Note: You must add your own items to your collection for them to show up.</strong>
              </v-alert>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
      <me-homebrew-create-dialog :shown="createNewDialog" @close="createNewDialog = false" />
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      createNewDialog: false,
      tab: 0
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
