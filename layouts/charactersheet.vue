<template>
  <v-app>
    <!-- START: APP BAR -->
    <me-app-bar :extended="characterReady && $vuetify.breakpoint.smAndDown" :extension-height="140">
      <template #appBarExtension>
        <div style="width: 100%">
          <me-character-sheet-main-menu />
          <me-character-sheet-mobile-menu />
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
      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        fab
        bottom
        right
        fixed
        style="z-index: 1000"
        @click="mobileMenu = !mobileMenu"
      >
        <v-icon>
          {{ mobileMenu ? 'mdi-close' : 'mdi-dots-grid' }}
        </v-icon>
      </v-btn>
      <v-dialog v-if="$vuetify.breakpoint.smAndDown" v-model="mobileMenu" overlay-opacity=".9">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-btn block x-large color="primary" @click="mobileView = 'abilities'; mobileMenu = false">
                Abilities, Saves, Senses
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn block x-large color="primary" @click="mobileView = 'skills'; mobileMenu = false">
                Proficiencies
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn block x-large color="primary" @click="mobileView = 'actions'; mobileMenu = false">
                Actions & Features
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block x-large color="primary" @click="mobileView = 'powers'; mobileMenu = false">
                Powers
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block x-large color="primary" @click="mobileView = 'equipment'; mobileMenu = false">
                Gear
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block x-large color="primary" @click="mobileView = 'details'; mobileMenu = false">
                Details
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block x-large color="primary" @click="mobileView = 'notes'; mobileMenu = false">
                Notes
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn block x-large color="primary" @click="mobileView = 'settings'; mobileMenu = false">
                Settings
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>
    </v-main>
    <!-- END: CONTENT -->
  </v-app>
</template>

<script>
import { MetaHead } from '~/mixins/MetaHead'
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [MetaHead, CharacterBuilderHelpers],
  data () {
    return {
      mobileMenu: false
    }
  },
  computed: {
    mobileView: {
      get () {
        return this.$store.getters['cb/mobileView']
      },
      set (value) {
        this.$store.commit('cb/SET_MOBILE_VIEW', value)
      }
    }
  }
}
</script>
