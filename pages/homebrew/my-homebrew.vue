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
              <me-my-homebrew-table />
            </v-tab-item>
            <v-tab-item>
              <me-my-homebrew-table collection />
              <v-alert type="warning" class="my-5" text>
                When you remove an item from you collection, it will persist on all of your characters until it is removed
                from that character. For example, if you have added a power, you will need to remove the power from the
                powers manager on the character and then refresh the page.
              </v-alert>
            </v-tab-item>
          </v-tabs-items>
          <v-alert type="info" class="my-5 font-weight-bold" text>
            Items in your collection will show up throughout the site (for your account only) and can be used on your character sheets.
            <em>Note: You must add your own items to your collection for them to show up.</em>
          </v-alert>
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
