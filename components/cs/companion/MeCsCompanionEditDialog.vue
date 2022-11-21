<template>
  <v-dialog
    :value="show"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar flat>
          <v-toolbar-title>
            Edit {{ companion.name }} (companion)
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
            <v-btn v-else icon @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
          <template v-if="$vuetify.breakpoint.smAndUp" #extension>
            <me-cs-card-nav-chips chip-set="companion" />
          </template>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-container style="max-width: 800px">
          <me-cs-companion-edit-form :companion="companion" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('close')">
          Close
        </v-btn>
        <v-spacer />
        <v-btn text color="error" @click="confirmDeleteDialog = true">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="confirmDeleteDialog" max-width="500">
      <v-card>
        <v-card-title>
          Delete {{ companion.name }}?
        </v-card-title>
        <v-card-actions>
          <v-btn text @click="confirmDeleteDialog = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn text color="error" @click="$emit('delete')">
            Yes, delete this companion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeCsCompanionEditDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    companion: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      confirmDeleteDialog: false
    }
  },
  computed: {
    activeSettingsTabTitle () {
      return this.settingsTabs[this.settingsTab]
    },
    settingsTabs () {
      return this.$store.state.character.navigation.companionTabs
    },
    settingsTab: {
      get () {
        return this.$store.getters['character/navigation/companionTab']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'companionTab', value })
      }
    }
  }
}
</script>
