<template>
  <v-container style="max-width: 1200px">
    <v-row>
      <v-col cols="4">
        <me-cs-main-menu />
        <me-cs-apsi />
        <me-cs-health />
      </v-col>
      <v-col cols="8">
        <me-cs-abilities />
        <v-row>
          <v-col cols="6">
            <v-card outlined>
              <me-cs-saving-throws />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card outlined>
              <me-cs-senses />
            </v-card>
          </v-col>
        </v-row>
        <v-card outlined class="mt-3">
          <me-cs-skills />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-card outlined height="500px">
          <div class="d-flex flex-column">
            <div style="flex: 0 0 auto">
              <v-tabs v-model="tab">
                <template v-for="t in tabs">
                  <v-tab :key="t">
                    {{ t }}
                  </v-tab>
                </template>
              </v-tabs>
            </div>
            <div style="flex: 1 1 auto; position: relative; height: 452px" class="overflow-y-auto pt-3 pb-5">
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <!--
                  <me-cs-actions />
                  -->
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <me-cs-powers />
                  </v-card-text>
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <!--
                    <me-character-sheet-equipment />
                    -->
                  </v-card-text>
                </v-tab-item>
                <v-tab-item>
                  <!--
                  <me-cs-features />
                  -->
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <!--
                    <me-character-sheet-details />
                    -->
                  </v-card-text>
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <!--
                    <me-character-sheet-notes />
                    -->
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <div class="mb-5">
          <!--
          <me-cs-reputation />
          -->
        </div>
        <div class="mb-5">
          <!--
          <me-character-sheet-short-long-rest />
          -->
        </div>
        <v-card outlined>
          <v-card-text>
            <!--
            <me-character-sheet-proficiencies />
            -->
          </v-card-text>
        </v-card>
        <div class="mt-5 d-flex justify-center">
          <v-btn @click="showSettings = true">
            Settings
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="showSettings" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Settings
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn text @click="showSettings = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="d-flex justify-center">
          <div style="max-width: 700px">
            <!--
            <me-character-sheet-settings />
            -->
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'MeCsViewsLg',
  data () {
    return {
      tab: null,
      tabs: ['Actions', 'Powers', 'Gear', 'Features', 'Details', 'Notes'],
      showSettings: false
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
