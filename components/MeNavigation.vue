<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <v-list dense>
      <template v-for="(page, index) in pages">
        <v-list-item v-if="page.to" :key="index" :to="page.to" nuxt>
          <v-list-item-action v-if="page.icon">
            <v-icon>
              {{ page.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ page.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader v-if="page.header" :key="index">
          {{ page.header }}
        </v-subheader>
        <v-list-group v-if="page.items" :key="index" :prepend-icon="page.icon">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ page.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-for="subItem in page.items">
            <v-list-item v-if="subItem.to" :key="subItem.name" link :to="subItem.to">
              <v-list-item-content>
                <v-list-item-title>{{ subItem.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-subheader v-else :key="subItem.name">
              {{ subItem.name }}
            </v-subheader>
          </template>
        </v-list-group>
        <v-divider v-if="page.divider" :key="index" />
      </template>
    </v-list>

    <template v-slot:append>
      <v-list dense>
        <v-subheader>Settings</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Mode: {{ darkMode ? 'Dark' : 'Light' }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="toggleDarkMode">
              <v-icon>{{ darkModeIcon }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Units: {{ imperial ? 'Imperial' : 'Metric' }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="imperial" inset dense />
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-toolbar dense>
        <v-toolbar-title>VERSION {{ version }}</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MeNavigation',
  data () {
    return {
      pages: [
        {
          header: 'Player\'s Manual'
        },
        {
          name: 'Introduction',
          icon: 'mdi-book-open-variant',
          to: '/manual/intro'
        },
        {
          name: 'Rules',
          icon: 'mdi-gavel',
          items: [
            { name: 'Step-by-step Characters', icon: 'supervised_user_circle', to: '/manual/character-creation' },
            { name: 'Beyond 1st Level', icon: 'tending_up', to: '/manual/beyond-first-level' },
            { name: 'Using Ability Scores', icon: 'gamepad', to: '/manual/using-ability-scores' },
            { name: 'Missions', icon: 'map', to: '/manual/missions' },
            { name: 'Equipment', icon: 'category', to: '/manual/equipment' },
            { name: 'Finances', icon: 'money', to: '/manual/finances' },
            { name: 'Vehicles', icon: '', to: '/manual/vehicles' },
            { name: 'Combat', icon: '', to: '/manual/combat' },
            { name: 'Spellcasting', icon: '', to: '/manual/spellcasting' },
            { name: 'About the Bestiary', icon: '', to: '/manual/bestiary' }
          ]
        },
        {
          name: 'Characters',
          icon: 'mdi-face-agent',
          items: [
            { to: '/classes', name: 'Classes' },
            { to: '/races', name: 'Races' },
            { to: '/feats', name: 'Feats' },
            { to: '/backgrounds', name: 'Backgrounds' }
          ]
        },
        {
          name: 'Equipment',
          icon: 'mdi-hammer-wrench',
          items: [
            { to: '/weapons', name: 'Weapons' },
            { to: '/armor', name: 'Armor' },
            { to: '/mods', name: 'Mods' },
            { to: '/gear', name: 'Gear' },
            { to: '/vehicles', name: 'Vehicles' }
          ]
        },
        {
          name: 'Spells & Powers',
          icon: 'mdi-fire',
          to: '/powers'
        },
        {
          name: 'Bestiary',
          icon: 'mdi-paw',
          to: '/bestiary'
        },
        {
          name: 'Appendix',
          icon: 'mdi-view-split-vertical',
          items: [
            { to: '/appendix/conditions', name: 'Conditions' },
            { to: '/appendix/skills', name: 'Skills' },
            { to: '/appendix/tool-profs', name: 'Tool Proficiencies' },
            { to: '/appendix/weapon-properties', name: 'Weapon Properties' }
          ]
        },
        {
          name: 'Bookmarks',
          icon: 'mdi-book',
          to: '/bookmarks'
        },
        {
          divider: true
        },
        {
          header: 'Tools'
        },
        {
          name: 'For GMs',
          icon: 'mdi-puzzle',
          items: [
            { to: '/for-gms/loot-generator', name: 'Loot Generator' },
            { to: '/for-gms/grunts', name: 'Grunt Generator' },
            { to: '/for-gms/armor-creation', name: 'Creating Armor' },
            { to: '/for-gms/encounter-builder', name: 'Encounter Builder' },
            { to: '/missions', name: 'Missions' }
          ]
        },
        {
          divider: true
        },
        {
          header: 'Mass Effect 5e'
        },
        { name: 'Get Involved', to: '/contributing' },
        { name: 'About the Project', to: '/about' },
        { name: 'Changelog', to: '/changelog' },
        { name: 'Offline / PDF version', to: '/print/pdf' },
        { name: 'License', to: '/license' }
      ]
    }
  },
  computed: {
    darkModeIcon () {
      return this.darkMode ? 'mdi-brightness-4' : 'mdi-brightness-5'
    },
    darkMode () {
      return this.$store.getters['user/darkMode']
    },
    imperial: {
      get () {
        return this.$store.getters['user/imperial']
      },
      set (value) {
        this.$store.commit('user/SET_IMPERIAL', value)
      }
    },
    drawer: {
      get () {
        return this.$store.getters.drawer
      },
      set (value) {
        this.$store.commit('drawer', value)
      }
    },
    version () {
      return this.$store.getters.version
    }
  },
  methods: {
    toggleDarkMode () {
      this.$store.commit('user/TOGGLE_DARK_MODE')
      this.$vuetify.theme.dark = this.$store.getters['user/darkMode']
    }
  }
}
</script>
