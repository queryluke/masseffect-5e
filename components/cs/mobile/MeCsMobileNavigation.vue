<template>
  <v-dialog v-model="mobileMenu" overlay-opacity=".9">
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col>
            <me-cs-short-long-rest />
            <v-divider class="mt-2" />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="nav in mobileNav" :key="nav.view" :cols="nav.size">
            <v-btn block x-large color="primary" :outlined="nav.view === mobileView" @click="show(nav.view)">
              {{ nav.title }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeCsMobileNavigation',
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
        { view: 'notes', title: 'Notes', size: 6 }
      ]
    }
  },
  computed: {
    mobileMenu: {
      get () {
        return this.$store.getters['character/navigation/mobileMenu']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileMenu', value })
      }
    },
    mobileView: {
      get () {
        return this.$store.getters['character/navigation/mobileView']
      },
      set (value) {
        return this.$store.commit('character/navigation/SET', { key: 'mobileView', value })
      }
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
