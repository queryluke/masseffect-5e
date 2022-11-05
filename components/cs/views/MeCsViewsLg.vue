<template>
  <v-container :style="{'max-width': maxWidth}">
    <v-row no-gutters>
      <v-col cols="4">
        <me-cs-main-menu />
        <me-cs-apsi />
        <me-cs-health />
      </v-col>
      <v-col cols="8" class="px-4">
        <me-cs-abilities />
        <v-row>
          <v-col cols="6">
            <v-card outlined>
              <me-cs-card-title>
                Saving Throws
              </me-cs-card-title>
              <me-cs-saving-throws />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card outlined>
              <me-cs-card-title>
                Senses
              </me-cs-card-title>
              <me-cs-senses />
            </v-card>
          </v-col>
        </v-row>
        <v-card outlined class="mt-3">
          <me-cs-card-title>
            Skills
          </me-cs-card-title>
          <me-cs-skills />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <me-cs-card-sticky-header :height="500" outlined hide-divider>
          <template #header>
            <v-tabs v-model="tab">
              <template v-for="t in tabs">
                <v-tab :key="t">
                  {{ t }}
                </v-tab>
              </template>
            </v-tabs>

            <!-- Action section prepends -->
            <div v-if="tab === 0">
              <div class="mt-1 mx-1">
                <me-cs-card-nav-chips chip-set="actions" />
                <div class="mt-1">
                  <me-cs-global-notes sub-type="action" />
                </div>
              </div>
              <v-divider class="mt-2" />
            </div>

            <!-- Power section prepends -->
            <div v-if="tab === 1">
              <div class="mt-1">
                <me-cs-powers-mods />
              </div>
              <v-row class="mx-4 mt-2" no-gutters>
                <v-col cols="8">
                  <me-cs-powers-level-filter />
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-btn x-small outlined color="primary" @click="$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-powers-manager')">
                    Manage
                  </v-btn>
                </v-col>
                <v-col cols="12" class="mt-2">
                  <me-cs-global-notes sub-type="power" />
                </v-col>
              </v-row>
              <v-divider class="mt-2" />
            </div>

            <!-- Equipment section prepends -->
            <div v-if="tab === 2">
              <me-cs-equipment-header />
              <v-divider class="mt-2" />
            </div>
          </template>
          <v-tabs-items v-model="tab" class="mb-3">
            <v-tab-item>
              <div class="px-4">
                <me-cs-actions />
              </div>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <template v-for="powerLevel in [0, 1, 2, 3, 4, 5, 6]">
                  <me-cs-powers-by-level :key="`powerLevel-${powerLevel}`" :level="powerLevel" />
                </template>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <me-cs-equipment />
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <div class="px-4">
                <me-cs-card-nav-chips chip-set="features" />
                <me-cs-features />
              </div>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <me-cs-details />
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <me-cs-notes />
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </me-cs-card-sticky-header>
      </v-col>
      <v-col cols="3">
        <div class="mb-5">
          <me-cs-card-title>
            Reputation
          </me-cs-card-title>
          <me-cs-reputation />
        </div>
        <div class="mb-5">
          <div class="d-flex justify-space-around">
            <me-cs-rest-btn type="short" :props="{ 'x-small': true }" />
            <me-cs-rest-btn type="long" :props="{ 'x-small': true }" />
          </div>
        </div>
        <v-card outlined>
          <me-cs-card-title>
            Proficiencies
          </me-cs-card-title>
          <div class="px-4">
            <me-cs-proficiencies />
          </div>
        </v-card>
        <div class="mt-5 d-flex justify-center">
          <v-btn @click="showSettings">
            Settings
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MeCsViewsLg',
  data () {
    return {
      tab: null,
      tabs: ['Actions', 'Powers', 'Gear', 'Features', 'Details', 'Notes']
    }
  },
  computed: {
    maxWidth () {
      return this.$vuetify.breakpoint.md
        ? '860px'
        : this.$vuetify.breakpoint.lg
          ? '1000px'
          : '1200px'
    }
  },
  methods: {
    showSettings () {
      this.$store.commit('character/navigation/SET', { key: 'settingsMenu', value: true })
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
