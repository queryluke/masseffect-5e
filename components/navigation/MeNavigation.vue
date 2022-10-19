<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <!-- MIGHT KEEP THIS FOR LATER
    <template v-if="$vuetify.breakpoint.smAndDown" #prepend>
      <v-list class="pa-0">
        <v-list-item @click="drawer = false">
          <v-list-item-action>
            <v-icon>mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-right text-h6">
              Mass Effect
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar tile size="23" class="ml-1">
            <img :src="require('~/assets/images/me5e.svg')">
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
      <v-divider />
    </template>
    -->
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
          :avatar="page.to === '/bookmarks' ? bookmarkCount : false"
        />
        <v-subheader v-if="page.header" :key="index">
          {{ page.header }}
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
      <v-toolbar dense>
        <v-menu offset-y top>
          <template #activator="{ on, attrs }">
            <v-toolbar-title
              class="text-body-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ $config.version }}
              <v-icon>
                mdi-menu-up
              </v-icon>
            </v-toolbar-title>
          </template>
          <v-list>
            <v-list-item
              v-for="item in pastVersions"
              :key="item.name"
              :href="item.link"
              target="_blank"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer />
        <v-toolbar-items>
          <v-btn small text @click="settingsDialog = !settingsDialog">
            <v-icon small>
              mdi-cog
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </template>

    <!-- Settings Dialog -->
    <v-dialog v-model="settingsDialog" max-width="500">
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
          header: this.$t('manual.title')
        },
        {
          name: this.$t('manual.intro'),
          icon: 'mdi-book-open-variant',
          to: '/manual/intro'
        },
        {
          name: this.$t('rules_title'),
          icon: 'mdi-gavel',
          items: [
            { name: this.$t('manual.character_creation'), icon: 'supervised_user_circle', to: '/manual/character-creation' },
            { name: this.$t('manual.beyond_first_level'), icon: 'tending_up', to: '/manual/beyond-first-level' },
            { name: this.$t('manual.using_ability_scores'), icon: 'gamepad', to: '/manual/using-ability-scores' },
            { name: this.$t('manual.missions'), icon: 'map', to: '/manual/missions' },
            { name: this.$t('manual.equipment'), icon: 'category', to: '/manual/equipment' },
            { name: this.$t('manual.finances'), icon: 'money', to: '/manual/finances' },
            { name: this.$t('manual.vehicles'), icon: '', to: '/manual/vehicles' },
            { name: this.$t('manual.combat'), icon: '', to: '/manual/combat' },
            { name: this.$t('manual.powercasting'), icon: '', to: '/manual/powercasting' },
            { name: this.$t('manual.about_bestiary'), icon: '', to: '/manual/bestiary' }
          ]
        },
        {
          name: this.$tc('character_title', 1),
          icon: 'mdi-face-agent',
          items: [
            { to: '/classes', name: this.$tc('class_title', 2) },
            { to: '/species', name: this.$tc('species_title', 2) },
            { to: '/feats', name: this.$tc('feat_title', 2) },
            { to: '/backgrounds', name: this.$tc('background_title', 2) }
          ]
        },
        {
          name: this.$tc('equipment_title', 2),
          icon: 'mdi-hammer-wrench',
          items: [
            { to: '/weapons', name: this.$tc('weapon_title', 2) },
            { to: '/armor', name: this.$tc('armor_title', 2) },
            { to: '/mods', name: this.$tc('mod_title', 2) },
            { to: '/gear', name: this.$tc('gear_title', 2) },
            { to: '/vehicles', name: this.$tc('vehicle_title', 2) }
          ]
        },
        {
          name: this.$tc('power_title', 2),
          icon: 'mdi-fire',
          to: '/powers'
        },
        {
          name: this.$tc('bestiary_title', 2),
          icon: 'mdi-paw',
          to: '/bestiary'
        },
        {
          name: this.$t('appendix_title'),
          icon: 'mdi-view-split-vertical',
          items: [
            { to: '/appendix/conditions', name: this.$t('conditions_title') },
            { to: '/appendix/benefits', name: 'Reputation Benefits' },
            { to: '/appendix/random-height-weight', name: this.$t('random_height_weight_title') },
            { to: '/appendix/skills', name: this.$t('skills_title') },
            { to: '/appendix/tool-profs', name: this.$t('tool_profs_title') },
            { to: '/appendix/weapon-properties', name: this.$t('weapon_props_title') }
          ]
        },
        {
          name: this.$t('bookmarks_title'),
          icon: 'mdi-book',
          to: '/bookmarks'
        },
        {
          divider: true
        },
        {
          header: this.$t('tools_guides_title')
        },
        {
          name: 'My Characters',
          to: '/characters',
          icon: 'mdi-clipboard-account'
        },
        {
          name: this.$t('generators_title'),
          icon: 'mdi-cog-sync',
          group: 'generator',
          items: [
            { to: '/generators/loot', name: this.$t('loot_generator_title') },
            { to: '/generators/npc', name: this.$t('npc_generator_title') }
          ]
        },
        {
          name: this.$t('guide.title'),
          icon: 'mdi-puzzle',
          group: 'guide',
          items: [
            { to: '/guide/armor-creation', name: this.$t('guide.creating_armor') },
            { to: '/guide/vehicle-creation', name: this.$t('guide.creating_vehicles') }
          ]
        },
        {
          divider: true
        },
        {
          header: this.$t('title')
        },
        {
          to: '/homebrew',
          name: 'Community Homebrew'
        },
        {
          to: '/assets',
          name: this.$t('assets_title')
        },
        {
          to: '/changelog',
          name: this.$t('changelog_title')
        }
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
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
      if (this.$vuetify.breakpoint.smAndDown) {
        navigation.push({ to: '/about', name: this.$t('about_title') })
        navigation.push({ to: '/license', name: this.$t('license_title') })
      }
      return navigation
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
