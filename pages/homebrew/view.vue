<template>
  <v-container>
    <v-row v-if="!isAuthenticated || !homebrew" justify="center">
      <v-col class="text-center">
        <v-icon size="300" class="mt-8 mb-5" color="grey darken-2">
          mdi-database-eye-off
        </v-icon>
        <p v-if="isAuthenticated">
          Sorry, we couldn't find that homebrew
        </p>
        <div v-else>
          <p>
            To view homebrew, you must have an account and be logged in.
          </p>
          <v-btn to="/">
            Return
          </v-btn>
          <v-btn @click="$store.dispatch('auth/LOG_IN', $nuxt.$route.path)">
            Sign In
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div v-else>
      <v-card>
        <v-card-text>
          <div class="d-flex align-center">
            <div class="text-button">
              {{ modelConfig[homebrew.model].nameSingular }}
            </div>
            <div class="ml-2 text-caption">
              <em>
                by {{ homebrew.profile.username || 'anonymous' }}
              </em>
            </div>
          </div>
          <component :is="`me-homebrew-preview-${homebrew.model}`" :item="JSON.parse(homebrew.data)" />
        </v-card-text>
        <v-card-actions>
          <me-homebrew-add-btn large :homebrew="homebrew" />
          <v-spacer />
          <me-homebrew-vote-btn large :homebrew="homebrew" />
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { homebrewModelConfig } from '~/mixins/homebrewModelConfig'
export default {
  mixins: [homebrewModelConfig],
  async asyncData ({ store, redirect, route }) {
    if (!route.query.id) {
      redirect('/characters')
    }
    store.commit('pageTitle', 'Mass Effect 5e')
    try {
      const homebrew = await store.dispatch('api/QUERY', { query: 'getHomebrew', variables: { id: route.query.id } })
      return {
        homebrew: homebrew || null
      }
    } catch (e) {
      return {
        homebrew: null
      }
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>
