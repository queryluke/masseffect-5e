<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar :extended="characterReady && $vuetify.breakpoint.smAndDown" :extension-height="140" show-character-cloud-status>
      <template #appBarExtension>
        <div style="width: 100%">
          <div class="mx-n4">
            <me-cs-main-menu />
            <me-cs-apsi />
          </div>
        </div>
      </template>
    </me-app-bar>
    <!-- END: APP BAR -->

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
  computed: {
    characterReady () {
      return this.$store.getters['character/characterReady']
    }
  }
}
</script>
