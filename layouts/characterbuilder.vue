<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar show-character-cloud-status tabbed />
    <!-- END: APP BAR -->
    <me-version-snackbar />
    <!-- START: NAV DRAWER -->
    <me-navigation />
    <!-- END: NAV DRAWER -->

    <!-- START: CONTENT -->
    <v-main>
      <me-logout />
      <nuxt />
    </v-main>
    <!-- END: CONTENT -->
  </v-app>
</template>

<script>
import { MetaHead } from '~/mixins/MetaHead'

export default {
  mixins: [MetaHead],
  created () {
    const character = this.$store.getters['character/character']
    const name = character?.name || 'Unnamed Character'
    this.$store.dispatch('SET_META', { title: `${name} - Edit` })
  }
}
</script>
