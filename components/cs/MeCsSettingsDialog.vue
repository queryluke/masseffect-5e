<template>
  <v-dialog
    v-model="settingsMenu"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar flat :extended="$vuetify.breakpoint.smAndUp">
          <v-toolbar-title>
            Settings & Overrides
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-menu v-if="$vuetify.breakpoint.smAndDown" offset-y>
              <template #activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  small
                  v-on="on"
                >
                  {{ activeSettingsTabTitle }}
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item
                  v-for="(item, index) in settingsTabs"
                  :key="index"
                  :value="index === settingsTab"
                  @click="settingsTab = index"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-else icon @click="settingsMenu = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
          <template v-if="$vuetify.breakpoint.smAndUp" #extension>
            <me-cs-card-nav-chips chip-set="settings" />
          </template>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-container style="max-width: 800px">
          <me-cs-settings />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="settingsMenu = false"
        >
          {{ $t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeCsMobileSettings',
  computed: {
    settingsMenu: {
      get () {
        return this.$store.getters['character/navigation/settingsMenu']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'settingsMenu', value })
      }
    },
    activeSettingsTabTitle () {
      return this.settingsTabs[this.settingsTab]
    },
    settingsTabs () {
      return this.$store.state.character.navigation.settingsTabs
    },
    settingsTab: {
      get () {
        return this.$store.getters['character/navigation/settingsTab']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'settingsTab', value })
      }
    }
  }
}
</script>
