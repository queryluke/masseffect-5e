<template>
  <v-navigation-drawer
    id="meCsSideNav"
    v-model="sideNav"
    app
    clipped
    right
    width="280"
    disable-resize-watcher
  >
    <template #prepend>
      <component :is="`${sideNavComponent}-prepend`" />
      <v-divider />
    </template>
    <template id="texting" #default>
      <component :is="sideNavComponent" id="testing" />
    </template>

    <template v-if="$vuetify.breakpoint.mdAndDown" #append>
      <v-divider />
      <v-btn text block @click="sideNav = false">
        Close
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MeCsSideNav',
  computed: {
    sideNav: {
      get () {
        return this.$store.getters['character/navigation/sideNav']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'sideNav', value })
      }
    },
    sideNavComponent () {
      return this.$store.getters['character/navigation/sideNavComponent']
    }
  }
}
</script>
