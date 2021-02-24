<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar />
    <!-- END: APP BAR -->

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
