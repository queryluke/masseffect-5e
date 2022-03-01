<template>
  <div class="mb-16 mx-1">
    <div v-if="mobileView === 'abilities'">
      <me-cs-card>
        <me-cs-abilities />
      </me-cs-card>
      <me-cs-card>
        <me-cs-saving-throws />
      </me-cs-card>
      <me-cs-card>
        <me-cs-senses />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'skills'">
      <me-cs-card>
        <me-cs-skills />
      </me-cs-card>
      <me-cs-card>
        <me-cs-proficiencies />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'notes'">
      <me-cs-card>
        <me-cs-notes />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'details'">
      <me-cs-card>
        <me-cs-reputation />
      </me-cs-card>
      <me-cs-card>
        <me-cs-details />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'equipment'">
      <me-cs-card>
        <me-cs-equipment />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'settings'">
      <me-cs-card>
        <me-cs-settings />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'actions'">
      <me-cs-short-long-rest />
      <me-cs-card>
        <me-cs-actions />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'features'">
      <me-cs-card>
        <me-cs-features />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'powers'">
      <me-cs-card>
        <me-cs-powers />
      </me-cs-card>
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
  </div>
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
        { view: 'settings', title: 'Settings', size: 12 }
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
