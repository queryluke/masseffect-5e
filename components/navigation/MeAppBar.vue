<template>
  <v-app-bar
    app
    dark
    clipped-left
    :clipped-right="clippedRight"
    :extended="extended"
    :extension-height="extensionHeight"
  >
    <!-- Drawer Icon -->
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mdAndDown || $nuxt.$route.path !== '/'"
      @click.stop="drawer = !drawer"
    />
    <!-- ME5e Icon -->
    <nuxt-link to="/">
      <v-avatar tile size="24">
        <img src="/icon.png" :alt="`Mass Effect 5e icon`">
      </v-avatar>
    </nuxt-link>
    <!-- Page Title -->
    <v-toolbar-title class="ml-3">
      {{ pageTitle }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn
        v-for="item in navigation"
        :key="item.name"
        :to="localePath(item.to)"
        text
        nuxt
        :href="item.href"
        exact
      >
        {{ item.nonTName || $t(item.name) }}
      </v-btn>
      <!--
      <me-lang-picker />
      -->
    </v-toolbar-items>

    <!-- USER MENU -->
    <v-toolbar-items>
      <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical />
      <v-menu v-if="isAuthenticated" offset-y bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar :size="$vuetify.breakpoint.smAndDown ? 30 : 36" color="secondary">
              <v-img v-if="avatar" :src="avatar" />
              <v-icon v-else>
                mdi-account
              </v-icon>
            </v-avatar>
            <span v-if="username && ($vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.sm)" class="text-overline ml-2">
              {{ username }}
            </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/profile">
            Profile
          </v-list-item>
          <v-list-item to="/characters" exact>
            Characters
          </v-list-item>
          <v-list-item to="/homebrew" exact>
            Homebrew
          </v-list-item>
          <v-list-item to="/bookmarks">
            Bookmarks
          </v-list-item>
          <v-list-item @click="$store.dispatch('auth/LOG_OUT')">
            Sign Out
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else :icon="$vuetify.breakpoint.smAndDown" @click="$store.dispatch('auth/LOG_IN', $nuxt.$route.path)">
        <span v-if="$vuetify.breakpoint.mdAndUp">Sign In</span>
        <v-icon v-else>
          mdi-login
        </v-icon>
      </v-btn>
      <me-character-sync-status v-if="showCharacterCloudStatus" />
    </v-toolbar-items>

    <template v-if="tabbed && $vuetify.breakpoint.smAndDown" #extension>
      <me-tabbed-page-tabs />
    </template>
    <template v-else-if="extended && $vuetify.breakpoint.smAndDown" #extension>
      <slot name="appBarExtension" />
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MeAppBar',
  props: {
    clippedRight: {
      type: Boolean,
      default: false
    },
    tabbed: {
      type: Boolean,
      default: false
    },
    extended: {
      type: Boolean,
      default: false
    },
    extensionHeight: {
      type: [Number, String],
      default: '48'
    },
    showCharacterCloudStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mobileSearchDialog: false,
      navigation: [
        { to: '/manual/intro', name: 'manual.title' },
        { to: '/about', name: 'about_title' },
        { to: '/characters', nonTName: 'My Characters' }
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
    avatar () {
      return this.$store.state.user.avatar
    },
    username () {
      return this.$store.state.user.username
    },
    mainNavigation () {
      return this.$store.getters.mainNavigation
    },
    pageTitle () {
      return this.$vuetify.breakpoint.smAndDown ? this.$store.getters.pageTitle : this.$t('title')
    },
    drawer: {
      get () {
        return this.$store.getters.drawer
      },
      set (value) {
        this.$store.commit('drawer', value)
      }
    }
  },
  created () {
    this.$store.dispatch('migrator/MIGRATE')
  }
}
</script>
