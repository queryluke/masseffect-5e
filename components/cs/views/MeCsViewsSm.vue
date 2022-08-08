<template>
  <v-tabs-items v-model="tab" style="background-color: transparent">
    <v-tab-item>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <me-cs-abilities />
          </v-col>
          <v-col cols="6" class="pr-1">
            <v-card class="pa-1 pb-4 mb-2" outlined>
              <me-cs-card-title>Saving Throws</me-cs-card-title>
              <me-cs-saving-throws />
            </v-card>
            <v-card class="pa-1 pb-4 mb-2" outlined>
              <me-cs-card-title>Senses</me-cs-card-title>
              <me-cs-senses />
            </v-card>
            <v-card class="pa-1 pb-4 mb-2" outlined>
              <me-cs-card-title>Reputation</me-cs-card-title>
              <me-cs-reputation />
            </v-card>
            <v-card class="pa-1 pb-4" outlined>
              <me-cs-card-title>Proficiencies</me-cs-card-title>
              <div class="px-4">
                <me-cs-proficiencies />
              </div>
            </v-card>
            <div class="ma-3">
              <v-btn small block @click="$store.commit('character/navigation/SET', { key: 'smDetailsNotes', value: true })">
                Details & Notes
              </v-btn>
            </div>
          </v-col>
          <v-col cols="6" class="pl-1">
            <v-card class="pa-1 pb-4" outlined>
              <me-cs-card-title>Skills</me-cs-card-title>
              <me-cs-skill-list />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <v-row>
          <v-col>
            <me-cs-card-sticky-header>
              <template #header>
                <me-cs-card-title>Actions</me-cs-card-title>
                <div class="mx-2">
                  <me-cs-card-nav-chips chip-set="actions" />
                  <div class="mt-1">
                    <me-cs-global-notes sub-type="action" />
                  </div>
                </div>
              </template>
              <v-card-text class="px-2">
                <me-cs-actions />
              </v-card-text>
            </me-cs-card-sticky-header>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <v-row>
          <v-col>
            <me-cs-card title="Powers">
              <div class="mt-1">
                <me-cs-powers-mods />
              </div>
              <v-row class="mt-2">
                <v-col cols="8">
                  <me-cs-powers-level-filter />
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-btn x-small outlined color="primary" @click="$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-powers-manager')">
                    Manage
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <me-cs-global-notes sub-type="power" />
                </v-col>
              </v-row>
              <template v-for="powerLevel in [0, 1, 2, 3, 4, 5, 6]">
                <me-cs-powers-by-level :key="`powerLevel-${powerLevel}`" :level="powerLevel" />
              </template>
            </me-cs-card>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <v-row>
          <v-col>
            <me-cs-card title="Equipment">
              <me-cs-equipment-header />
              <v-divider class="my-2" />
              <me-cs-equipment />
            </me-cs-card>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <v-row>
          <v-col>
            <me-cs-card-sticky-header>
              <template #header>
                <me-cs-card-title>Settings</me-cs-card-title>
                <div class="mx-2">
                  <me-cs-card-nav-chips chip-set="settings" show-arrows />
                </div>
              </template>
              <v-card-text class="px-2">
                <me-cs-settings />
              </v-card-text>
            </me-cs-card-sticky-header>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  name: 'MeCsViewsSm',
  data () {
    return {
      tabs: ['abilities', 'actions', 'powers', 'gear', 'settings']
    }
  },
  computed: {
    tab: {
      get () {
        return this.tabs.findIndex(i => i === this.$store.getters['character/navigation/mobileView'])
      },
      set (tab) {
        const value = this.tabs[tab]
        return this.$store.commit('character/navigation/SET', { key: 'mobileView', value })
      }
    }
  }
}
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: transparent;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 4px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #303030;
  border-radius: 10px;
  border: 3px solid transparent;
}
</style>
