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
      <v-row class="mb-8">
        <v-col>
          <me-page-title />
        </v-col>
        <v-col class="text-right">
          <v-btn large to="/homebrew/my-homebrew" exact>
            My Homebrew
          </v-btn>
          <v-btn large color="primary" @click="createNewDialog = true">
            Create
          </v-btn>
        </v-col>
      </v-row>
      <div v-if="!selectedModel">
        <div class="text-h4 text-center">
          Select a type of homebrew
        </div>
        <div class="d-flex justify-center mt-4">
          <div v-for="(config, modelKey) of modelConfig" :key="modelKey">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  fab
                  outlined
                  :color="config.color"
                  large
                  v-bind="attrs"
                  class="mx-3"
                  @click="selectedModel = modelKey"
                  v-on="on"
                >
                  <v-icon>{{ config.icon }}</v-icon>
                </v-btn>
              </template>
              <span class="text-capitalize">{{ modelKey }}</span>
            </v-tooltip>
          </div>
        </div>
      </div>
      <div v-else class="d-flex align-center">
        <v-icon :color="modelConfig[selectedModel].color" size="32">
          {{ modelConfig[selectedModel].icon }}
        </v-icon>
        <span class="text-capitalize text-h4">
          {{ selectedModel }}
        </span>
        <v-btn x-small class="ml-4" outlined @click="selectedModel = null">
          Change
        </v-btn>
      </div>
      <me-homebrew-create-dialog :shown="createNewDialog" @close="createNewDialog = false" />
      <me-homebrew-table v-show="selectedModel" :selected-model="selectedModel" />
    </div>
  </v-container>
</template>

<script>
import { homebrewModelConfig } from '~/mixins/homebrewModelConfig'
export default {
  mixins: [homebrewModelConfig],
  data () {
    return {
      createNewDialog: false,
      selectedModel: null
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: 'Homebrew',
      description: 'Community created homebrew'
    })
  }
}
</script>
