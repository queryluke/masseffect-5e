<template>
  <v-navigation-drawer
    id="meCsSideNav"
    v-model="sideNav"
    app
    clipped
    right
    :width="$vuetify.breakpoint.xsOnly ? 280 : 340"
    disable-resize-watcher
  >
    <template #prepend>
      <component :is="`${sideNavComponent}-prepend`" />
      <v-divider />
    </template>
    <template id="texting" #default>
      <component :is="sideNavComponent" />
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

<style>
/* ===== Scrollbar CSS ===== */
/* Firefox */
#meCsSideNav * {
  scrollbar-width: thin;
  scrollbar-color: transparent;
}

/* Chrome, Edge, and Safari */
#meCsSideNav *::-webkit-scrollbar {
  width: 4px;
}

#meCsSideNav *::-webkit-scrollbar-track {
  background: transparent;
}

#meCsSideNav *::-webkit-scrollbar-thumb {
  background-color: #303030;
  border-radius: 10px;
  border: 3px solid transparent;
}
</style>
