<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar tabbed />
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
  mixins: [MetaHead]
}
</script>
