<template>
  <div>
    <v-container v-if="characterNotFound">
      <v-row justify="center">
        <v-col class="text-center">
          <v-img src="/images/species/custom_species.png" max-width="300" class="mx-auto" />
          <p v-if="isAuthenticated">
            Sorry, we couldn't find that character
          </p>
          <p v-else>
            To view other players' characters, you must have an account and be logged in.
          </p>
          <v-btn to="/characters">
            Back to Character List
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      <me-cs-not-ready v-if="!characterReady" />
      <div v-else>
        <me-cs-views-xs v-if="$vuetify.breakpoint.xsOnly" />
        <me-cs-views-sm v-if="$vuetify.breakpoint.sm" />
        <me-cs-views-lg v-if="$vuetify.breakpoint.mdAndUp" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'charactersheet',
  async asyncData ({ store, redirect, route }) {
    if (!route.query.id) {
      redirect('/characters')
    }
    store.commit('pageTitle', 'Mass Effect 5e')
    await store.dispatch('character/FETCH_CB_DATA')
    const character = await store.dispatch('character/LOAD_CHARACTER', route.query.id)
    return {
      characterNotFound: !character
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    characterReady () {
      return this.$store.getters['character/characterReady']
    }
  }
}
</script>
