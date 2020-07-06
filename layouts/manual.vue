<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar clipped-left clipped-right />
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
export default {}
</script>
