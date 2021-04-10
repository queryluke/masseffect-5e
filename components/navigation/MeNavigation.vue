<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <!-- SEARCH -->
    <v-text-field
      v-model="search"
      dense
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      solo
      clearable
      class="ma-2"
      @keyup.enter="submit"
    />

    <!-- Navigation -->
    <v-list dense>
      <template v-for="(page, index) in navigation">
        <me-nav-list-item
          v-if="page.to"
          :key="index"
          :to="page.to"
          :text="page.name"
          :icon="page.icon"
          :avatar="page.name === 'site.bookmarks' ? bookmarkCount : false"
        />
        <v-subheader v-if="page.header" :key="index">
          {{ $t(page.header) }}
        </v-subheader>
        <me-nav-list-group
          v-if="page.items"
          :key="index"
          :text="page.name"
          :icon="page.icon"
          :items="page.items"
        />
        <v-divider v-if="page.divider" :key="index" />
      </template>
    </v-list>

    <!-- Settings -->
    <template #append>
      <v-divider />
      <me-user-settings v-if="$vuetify.breakpoint.mdAndUp" />
      <v-toolbar dense>
        <v-menu offset-y top>
          <template #activator="{ on, attrs }">
            <v-toolbar-title
              class="text-body-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ $t('site.version') }} {{ version }}
              <v-icon>
                mdi-menu-up
              </v-icon>
            </v-toolbar-title>
          </template>
          <me-version-menu />
        </v-menu>
        <v-spacer />
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndDown">
          <v-btn small text @click="settingsDialog = !settingsDialog">
            <v-icon small>
              mdi-cog
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </template>

    <!-- Settings Dialog -->
    <v-dialog v-if="$vuetify.breakpoint.smAndDown" v-model="settingsDialog">
      <v-card>
        <v-card-text>
          <me-user-settings />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MeNavigation',
  data () {
    return {
      settingsDialog: false,
      nav: [
        {
          header: 'site.players_manual'
        },
        {
          name: 'site.intro',
          icon: 'mdi-book-open-variant',
          to: '/manual/intro'
        },
        {
          name: 'site.rules',
          icon: 'mdi-gavel',
          items: [
            { name: 'site.character_creation', icon: 'supervised_user_circle', to: '/manual/character-creation' },
            { name: 'site.beyond_first_level', icon: 'tending_up', to: '/manual/beyond-first-level' },
            { name: 'site.using_ability_scores', icon: 'gamepad', to: '/manual/using-ability-scores' },
            { name: 'site.missions', icon: 'map', to: '/manual/missions' },
            { name: 'site.equipment', icon: 'category', to: '/manual/equipment' },
            { name: 'site.finances', icon: 'money', to: '/manual/finances' },
            { name: 'site.vehicles', icon: '', to: '/manual/vehicles' },
            { name: 'site.combat', icon: '', to: '/manual/combat' },
            { name: 'site.powercasting', icon: '', to: '/manual/powercasting' },
            { name: 'site.about_bestiary', icon: '', to: '/manual/bestiary' }
          ]
        },
        {
          name: 'site.characters',
          icon: 'mdi-face-agent',
          items: [
            { to: '/classes', name: 'site.classes' },
            { to: '/species', name: 'site.species' },
            { to: '/feats', name: 'site.feats' },
            { to: '/backgrounds', name: 'site.backgrounds' }
          ]
        },
        {
          name: 'site.equipment',
          icon: 'mdi-hammer-wrench',
          items: [
            { to: '/weapons', name: 'site.weapons' },
            { to: '/armor', name: 'site.armor' },
            { to: '/mods', name: 'site.mods' },
            { to: '/gear', name: 'site.gear' },
            { to: '/vehicles', name: 'site.vehicles' }
          ]
        },
        {
          name: 'site.powers',
          icon: 'mdi-fire',
          to: '/powers'
        },
        {
          name: 'site.bestiary',
          icon: 'mdi-paw',
          to: '/bestiary'
        },
        {
          name: 'site.appendix',
          icon: 'mdi-view-split-vertical',
          items: [
            { to: '/appendix/conditions', name: 'site.conditions' },
            { to: '/appendix/random-height-weight', name: 'site.random_height_weight' },
            { to: '/appendix/skills', name: 'site.skills' },
            { to: '/appendix/tool-profs', name: 'site.tool_profs' },
            { to: '/appendix/weapon-properties', name: 'site.weapon_props' }
          ]
        },
        {
          name: 'site.bookmarks',
          icon: 'mdi-book',
          to: '/bookmarks'
        },
        {
          divider: true
        },
        {
          header: 'site.tools_guides'
        },
        {
          name: 'site.character_builder',
          to: '/',
          icon: 'mdi-clipboard-account'
        },
        {
          name: 'site.generators',
          icon: 'mdi-cog-sync',
          group: 'generator',
          items: [
            { to: '/generators/loot', name: 'site.loot_generator' },
            { to: '/generators/npc', name: 'site.npc_generator' }
          ]
        },
        {
          name: 'site.guides',
          icon: 'mdi-puzzle',
          group: 'guide',
          items: [
            { to: '/guide/armor-creation', name: 'site.creating_armor' },
            { to: '/guide/vehicle-creation', name: 'site.creating_vehicles' },
            { to: '/guide/encounter-creation', name: 'site.creating_encounters' }
          ]
        }
      ]
    }
  },
  computed: {
    search: {
      get () {
        return this.$store.getters['user/search']
      },
      set (value) {
        this.$store.commit('user/SET_SEARCH', value)
      }
    },
    navigation () {
      const navigation = this.nav.slice()
      if (this.$vuetify.breakpoint.mdAndDown) {
        navigation.push({ divider: true })
        navigation.push({ header: 'title' })
        navigation.push({ to: '/assets', name: 'site.assets' })
        navigation.push({ to: '/changelog', name: 'site.changelog' })
        navigation.push({ to: '/about', name: 'site.about' })
        navigation.push({ to: '/license', name: 'site.license' })
      }
      return navigation
    },
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
        if (this.$vuetify.breakpoint.lgAndUp && this.$nuxt.$route.path === '/') {
          return false
        }
        return this.$store.getters.drawer
      },
      set (value) {
        this.$store.commit('drawer', value)
      }
    },
    version () {
      return this.$config.version
    },
    pastVersions () {
      return this.$store.getters.pastVersions
    },
    bookmarkCount () {
      return this.$store.getters['user/bookmarkCount']
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['user/darkMode']
  },
  methods: {
    toggleDarkMode () {
      this.$store.dispatch('user/TOGGLE_DARK_MODE')
      this.$vuetify.theme.dark = this.$store.getters['user/darkMode']
    },
    submit () {
      this.$router.push({
        path: '/search'
      })
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.drawer = false
      }
    }
  }
}
</script>
