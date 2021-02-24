<template>
  <v-app-bar
    app
    dark
    clipped-left
    :clipped-right="clippedRight"
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
      <v-btn v-for="item in mainNavigation" :key="item.name" :to="item.to" text nuxt>
        {{ item.name }}
      </v-btn>
    </v-toolbar-items>
    <!-- jumplink nav -->
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndDown">
      <v-btn v-if="$vuetify.breakpoint.mdAndDown && hasJumpNav" icon @click.stop="jumpNav = !jumpNav">
        <v-icon>mdi-page-layout-sidebar-right</v-icon>
      </v-btn>
    </v-toolbar-items>
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
      mobileSearchDialog: false
    }
  },
  computed: {
    mainNavigation () {
      return this.$store.getters.mainNavigation
    },
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
