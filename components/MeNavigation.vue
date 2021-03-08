<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
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
    <v-list dense>
      <template v-for="(page, index) in navigation">
        <v-list-item v-if="page.to || page.href" :key="index" :to="page.to" nuxt :href="page.href">
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
          <v-list-item-avatar v-if="page.name === 'Bookmarks'" :size="20" color="secondary">
            <span class="text-caption white--text" style="padding-left: 6px;">{{ bookmarkCount }}</span>
          </v-list-item-avatar>
        </v-list-item>
        <v-subheader v-if="page.header" :key="index">
          {{ page.header }}
        </v-subheader>
        <v-list-group v-if="page.items" :key="index" :prepend-icon="page.icon" :group="group(page.items)" no-action>
          <template #activator>
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
              VERSION {{ version }}
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
      settingsDialog: false
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
      let navigation = this.$store.getters.navigation.slice()
      if (this.$vuetify.breakpoint.mdAndDown) {
        navigation.push({ divider: true })
        navigation.push({ header: 'Mass Effect 5e' })
        const addNav = this.$store.getters.mainNavigation.filter(i => ['Assets', 'Changelog', 'About'].includes(i.name))
        addNav.push({ to: '/license', name: 'License' })
        navigation = navigation.concat(addNav)
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
  methods: {
    toggleDarkMode () {
      this.$store.dispatch('user/TOGGLE_DARK_MODE')
      this.$vuetify.theme.dark = this.$store.getters['user/darkMode']
    },
    group (items) {
      return `(${items.map(i => `(^${i.to}$|^${i.to}/.*?)`).join('|')})`
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
