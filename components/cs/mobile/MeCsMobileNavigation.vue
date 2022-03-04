<template>
  <v-dialog
    v-model="mobileMenu"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card>
      <v-card-text>
        <v-container class="mt-16">
          <v-row>
            <v-col>
              <div class="d-flex justify-space-around">
                <me-cs-rest-btn type="short" :props="{ outlined: true }" />
                <me-cs-rest-btn type="long" :props="{ outlined: true }" />
              </div>
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
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="mobileMenu = false"
        >
          Close
        </v-btn>
      </v-card-actions>
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
