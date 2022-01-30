<template>
  <v-container>
    <div class="mb-16">
      <div v-if="mobileView === 'abilities'">
        <me-character-sheet-card>
          <me-character-sheet-abilities />
        </me-character-sheet-card>
        <me-character-sheet-card>
          <me-cs-saving-throws />
        </me-character-sheet-card>
        <me-character-sheet-card>
          <me-cs-senses />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'skills'">
        <me-character-sheet-card>
          <me-cs-skills />
        </me-character-sheet-card>
        <me-character-sheet-card>
          <me-character-sheet-proficiencies />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'notes'">
        <me-character-sheet-card>
          <me-character-sheet-notes />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'details'">
        <me-character-sheet-card>
          <me-cs-reputation />
        </me-character-sheet-card>
        <me-character-sheet-card>
          <me-character-sheet-details />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'equipment'">
        <me-character-sheet-card>
          <me-character-sheet-equipment />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'settings'">
        <me-character-sheet-card>
          <me-character-sheet-settings />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'actions'">
        <me-character-sheet-short-long-rest />
        <me-character-sheet-card>
          <me-cs-actions />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'features'">
        <me-character-sheet-card>
          <me-cs-features />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'powers'">
        <me-character-sheet-card>
          <me-character-sheet-powers />
        </me-character-sheet-card>
      </div>
    </div>
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
          <v-col v-for="nav in mobileNav" :key="nav.view" :cols="nav.size">
            <v-btn block x-large color="primary" @click="show(nav.view)">
              {{ nav.title }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'MeCsViewsXs',
  data () {
    return {
      mobileNav: [
        { view: 'abilities', title: 'Abilities, Saves, Senses', size: 12 },
        { view: 'skills', title: 'Proficiencies', size: 12 },
        { view: 'actions', title: 'Actions', size: 6 },
        { view: 'features', title: 'Features', size: 6 },
        { view: 'powers', title: 'Powers', size: 6 },
        { view: 'equipment', title: 'Gear', size: 6 },
        { view: 'details', title: 'Details', size: 6 },
        { view: 'notes', title: 'Notes', size: 6 },
        { view: 'settings', title: 'Setting', size: 6 }
      ],
      mobileView: 'abilities',
      mobileMenu: false
    }
  },
  methods: {
    show (value) {
      this.mobileView = value
      this.mobileMenu = false
    }
  }
}
</script>
