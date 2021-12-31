<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar clipped-right />
    <!-- END: APP BAR -->

    <me-version-snackbar />
    <!-- START: NAV DRAWER -->
    <me-jump-nav />
    <!-- END: NAV DRAWER -->

    <!-- START: NAV DRAWER -->
    <me-navigation />
    <!-- END: NAV DRAWER -->

    <!-- START: CONTENT -->
    <v-main>
      <me-logout />
      <nuxt />
      <!-- jumplink nav -->
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        fab
        fixed
        color="secondary"
        bottom
        right
        @click.stop="jumpNav = !jumpNav"
      >
        <v-icon>mdi-page-layout-sidebar-right</v-icon>
      </v-btn>
    </v-main>
    <!-- END: CONTENT -->
  </v-app>
</template>

<script>
import { MetaHead } from '~/mixins/MetaHead'

export default {
  mixins: [MetaHead],
  computed: {
    jumpNav: {
      get () {
        return this.$store.getters.jumpNav
      },
      set (value) {
        this.$store.commit('jumpNav', value)
      }
    }
  }
}
</script>
