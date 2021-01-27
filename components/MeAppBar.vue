<template>
  <v-app-bar
    app
    dark
    :clipped-left="clippedLeft"
    :clipped-right="clippedRight"
  >
    <!-- Drawer Icon -->
    <v-app-bar-nav-icon
      v-if="clippedLeft"
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
      <v-btn v-for="item in topNavigation" :key="item.name" :to="item.to" text nuxt>
        {{ item.name }}
      </v-btn>
    </v-toolbar-items>
    <!-- jumplink nav -->
    <v-btn v-if="$vuetify.breakpoint.mdAndDown && hasJumpNav" icon @click.stop="jumpNav = !jumpNav">
      <v-icon>mdi-page-layout-sidebar-right</v-icon>
    </v-btn>
    <v-menu v-if="$vuetify.breakpoint.mdAndDown" bottom left>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="item in topNavigation" :key="item.name" :to="item.to" nuxt>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-if="tabbed && $vuetify.breakpoint.smAndDown" v-slot:extension>
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
  </v-app-bar>
</template>

<script>
export default {
  name: 'MeAppBar',
  props: {
    clippedLeft: {
      type: Boolean,
      default: false
    },
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
    }
  },
  data () {
    return {
      topNavigation: [
        { to: '/manual/intro', name: 'Player\'s Manual' },
        { to: '/assets', name: 'Assets' },
        { to: '/changelog', name: 'Changelog' },
        { to: '/about', name: 'About' },
        { to: '/character-builder', name: 'Character Builder (BETA)' }
      ]
    }
  },
  computed: {
    pageTitle () {
      return this.$vuetify.breakpoint.smAndDown ? this.$store.getters.pageTitle : 'Mass Effect 5e'
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
