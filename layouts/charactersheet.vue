<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar :extended="characterReady && $vuetify.breakpoint.smAndDown" :extension-height="140" show-character-cloud-status clipped-right>
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

    <!-- START: NAV DRAWER -->
    <me-cs-side-navbar />
    <!-- END: NAV DRAWER -->

    <!-- START: CONTENT -->
    <v-main>
      <me-logout />
      <nuxt />
    </v-main>
    <!-- END: CONTENT -->

    <!-- Mobile Menu -->
    <me-cs-mobile-navigation />

    <!-- Mobile Settings Menu -->
    <me-cs-mobile-settings />

    <!-- Mobile Die Menu -->
    <me-cs-mobile-custom-die-roller />

    <v-bottom-navigation v-if="$vuetify.breakpoint.xsOnly" app grow>
      <v-btn @click="mobileRoller = !mobileRoller">
        <span>Roll</span>
        <v-icon>mdi-dice-multiple</v-icon>
      </v-btn>
      <v-btn @click="mobileMenu = !mobileMenu">
        <span>Menu</span>
        <v-icon>mdi-dots-grid</v-icon>
      </v-btn>
      <v-btn @click="mobileSettingsMenu = !mobileSettingsMenu">
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { MetaHead } from '~/mixins/MetaHead'

export default {
  mixins: [MetaHead],
  computed: {
    characterReady () {
      return this.$store.getters['character/characterReady']
    },
    mobileMenu: {
      get () {
        return this.$store.getters['character/navigation/mobileMenu']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileMenu', value })
      }
    },
    mobileView: {
      get () {
        return this.$store.getters['character/navigation/mobileView']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileView', value })
      }
    },
    mobileSettingsMenu: {
      get () {
        return this.$store.getters['character/navigation/mobileSettingsMenu']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileSettingsMenu', value })
      }
    },
    mobileRoller: {
      get () {
        return this.$store.getters['character/navigation/mobileRoller']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileRoller', value })
      }
    }
  },
  watch: {
    mobileView (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$vuetify.goTo(0)
      }
    }
  }
}
</script>
