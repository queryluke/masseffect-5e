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
        <v-btn
          v-if="$vuetify.breakpoint.smOnly"
          fab
          bottom
          left
          absolute
          style="margin-left: -12px"
          color="red darken-2"
          small
          elevation="0"
          @click="mobileRoller = true"
        >
          <v-icon>
            mdi-dice-multiple
          </v-icon>
        </v-btn>
      </template>
    </me-app-bar>
    <!-- END: APP BAR -->

    <!-- START: NAV DRAWER -->
    <me-navigation />
    <!-- END: NAV DRAWER -->

    <!-- START: NAV DRAWER -->
    <me-cs-side-nav />
    <!-- END: NAV DRAWER -->

    <!-- START: CONTENT -->
    <v-main>
      <me-logout />
      <nuxt />
    </v-main>
    <!-- END: CONTENT -->

    <!-- don't show anything unless character is ready -->
    <template v-if="characterReady">
      <!-- Settings Dialog -->
      <me-cs-settings-dialog />

      <!-- Small Screen details and notes -->
      <me-standard-dialog :shown="smDetailsNotes" @close="smDetailsNotes = false">
        <v-tabs v-model="smDetailsNotesTab">
          <v-tab>
            Notes
          </v-tab>
          <v-tab>
            Details
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="smDetailsNotesTab">
          <v-tab-item>
            <me-cs-notes />
          </v-tab-item>
          <v-tab-item>
            <me-cs-details />
          </v-tab-item>
        </v-tabs-items>
      </me-standard-dialog>

      <!-- Mobile Menu -->
      <me-cs-mobile-navigation />

      <!-- Mobile Die Menu -->
      <me-cs-mobile-custom-die-roller />

      <!-- Die Speed Dial for larger screens -->
      <me-cs-roll-speed-dial v-if="$vuetify.breakpoint.mdAndUp" />

      <me-cs-side-nav-toggle />

      <v-bottom-navigation v-if="$vuetify.breakpoint.xsOnly" app grow>
        <v-btn @click="mobileRoller = !mobileRoller">
          <span>Roll</span>
          <v-icon>mdi-dice-multiple</v-icon>
        </v-btn>
        <v-btn @click="mobileMenu = !mobileMenu">
          <span>Menu</span>
          <v-icon>mdi-dots-grid</v-icon>
        </v-btn>
        <v-btn @click="settingsMenu = !settingsMenu">
          <span>Settings</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <v-bottom-navigation v-if="$vuetify.breakpoint.smOnly" v-model="mobileView" app grow color="primary">
        <template v-for="item in smMenuItems">
          <v-btn :key="item.view" :value="item.view">
            <span>{{ item.name }}</span>
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
      </v-bottom-navigation>
    </template>
  </v-app>
</template>

<script>
import { MetaHead } from '~/mixins/MetaHead'
import MeStandardDialog from '~/components/MeStandardDialog'

export default {
  components: { MeStandardDialog },
  mixins: [MetaHead],
  data () {
    return {
      smDetailsNotesTab: 0,
      smMenuItems: [
        {
          name: 'Character',
          icon: 'mdi-head-cog',
          view: 'abilities'
        },
        {
          name: 'Actions',
          icon: 'mdi-sword',
          view: 'actions'
        },
        {
          name: 'Powers',
          icon: 'mdi-fire',
          view: 'powers'
        },
        {
          name: 'Gear',
          icon: 'mdi-sack',
          view: 'gear'
        },
        {
          name: 'Settings',
          icon: 'mdi-cog',
          view: 'settings'
        }
      ]
    }
  },
  computed: {
    characterReady () {
      return this.$store.getters['character/characterReady']
    },
    mobileMenu: {
      get () {
        return this.$store.getters['character/navigation/mobileMenu']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'mobileMenu', value })
      }
    },
    mobileView: {
      get () {
        return this.$store.getters['character/navigation/mobileView']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'mobileView', value })
      }
    },
    settingsMenu: {
      get () {
        return this.$store.getters['character/navigation/settingsMenu']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'settingsMenu', value })
      }
    },
    mobileRoller: {
      get () {
        return this.$store.getters['character/navigation/mobileRoller']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'mobileRoller', value })
      }
    },
    smDetailsNotes: {
      get () {
        return this.$store.getters['character/navigation/smDetailsNotes']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'smDetailsNotes', value })
      }
    },
    xsOnly () {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  watch: {
    mobileView (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$vuetify.goTo(0)
      }
    },
    xsOnly (newVal) {
      if (newVal && this.mobileView === 'settings') {
        this.mobileView = 'abilities'
      }
    }
  },
  created () {
    if (this.characterReady) {
      const name = this.$store.getters['character/character']?.name || 'Unnamed Character'
      this.$store.dispatch('SET_META', { title: name })
    }
  }
}
</script>
