<template>
  <v-container style="max-width: 1200px">
    <v-row>
      <v-col cols="4">
        <me-character-sheet-main-menu />
        <me-character-sheet-mobile-menu />
        <me-cs-health />
      </v-col>
      <v-col cols="8">
        <me-character-sheet-abilities />
        <v-row>
          <v-col cols="6">
            <v-card outlined>
              <me-character-sheet-saving-throws />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card outlined>
              <me-character-sheet-senses />
            </v-card>
          </v-col>
        </v-row>
        <v-card outlined class="mt-3">
          <me-character-sheet-skills />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-card outlined>
          <v-tabs v-model="tab">
            <template v-for="t in tabs">
              <v-tab :key="t">
                {{ t }}
              </v-tab>
            </template>
          </v-tabs>
          <v-card-text>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <me-character-sheet-actions />
              </v-tab-item>
              <v-tab-item>
                <me-character-sheet-powers />
              </v-tab-item>
              <v-tab-item>
                <me-character-sheet-equipment />
              </v-tab-item>
              <v-tab-item>
                <me-character-sheet-details />
              </v-tab-item>
              <v-tab-item>
                <me-character-sheet-settings />
              </v-tab-item>
              <v-tab-item>
                <me-character-sheet-notes />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
      <v-col cols="3">
        <div class="mb-5">
          <me-character-sheet-short-long-rest />
        </div>
        <v-card outlined>
          <v-card-text>
            <me-character-sheet-proficiencies />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      tabs: ['Actions', 'Powers', 'Gear', 'Details', 'Settings', 'Notes']
    }
  }
}
</script>
