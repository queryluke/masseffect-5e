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
    <v-toolbar-items v-if="$vuetify.breakpoint.lgAndUp">
      <v-btn
        v-for="item in navigation"
        :key="item.name"
        :to="localePath(item.to)"
        text
        nuxt
        :href="item.href"
      >
        {{ $t(item.name) }}
      </v-btn>
      <me-lang-picker />
    </v-toolbar-items>
    <!-- jumplink nav -->
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndDown">
      <v-btn v-if="$vuetify.breakpoint.mdAndDown && hasJumpNav" icon @click.stop="jumpNav = !jumpNav">
        <v-icon>mdi-page-layout-sidebar-right</v-icon>
      </v-btn>
    </v-toolbar-items>
    <template v-if="tabbed && $vuetify.breakpoint.smAndDown" #extension>
      <v-tabs
        v-model="tab"
        align-with-title
        center-active
        centered
        show-arrows
        :color="tabColor"
      >
        <v-tab v-for="item in tabs" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
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
    hasJumpNav: {
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
    }
  },
  data () {
    return {
      mobileSearchDialog: false,
      navigation: [
        { to: '/manual/intro', name: 'manual.title' },
        { to: '/assets', name: 'assets_title' },
        { to: '/changelog', name: 'changelog_title' },
        { to: '/about', name: 'about_title' },
        { href: 'https://versions.n7.world/v120/character-builder', name: 'character_builder_title' }
      ]
    }
  },
  computed: {
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
    },
    jumpNav: {
      get () {
        return this.$store.getters.jumpNav
      },
      set (value) {
        this.$store.commit('jumpNav', value)
      }
    },
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    },
    tabs () {
      return this.$store.getters['tabbedPage/tabs']
    },
    tabColor () {
      return this.$store.getters['tabbedPage/mobileTabColor']
    }
  }
}
</script>
