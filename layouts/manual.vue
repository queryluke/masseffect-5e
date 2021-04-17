<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar clipped-right has-jump-nav />
    <!-- END: APP BAR -->

    <!-- START: NAV DRAWER -->
    <me-jump-nav />
    <!-- END: NAV DRAWER -->

    <!-- START: NAV DRAWER -->
    <me-navigation />
    <!-- END: NAV DRAWER -->

    <!-- START: CONTENT -->
    <v-main>
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
