<template>
  <v-navigation-drawer
    id="meCsSideNavbar"
    v-model="sideNavbar"
    app
    clipped
    right
    width="280"
    disable-resize-watcher
  >
    <template #prepend>
      <component :is="`${sideNavbarComponent}-prepend`" />
      <v-divider />
    </template>
    <template id="texting" #default>
      <component :is="sideNavbarComponent" id="testing" />
    </template>

    <template #append>
      <v-divider />
      <v-btn text block @click="sideNavbar = false">
        Close
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MeCsDetailsMenu',
  computed: {
    sideNavbar: {
      get () {
        return this.$store.getters['character/navigation/sideNavbar']
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'sideNavbar', value })
      }
    },
    sideNavbarComponent () {
      return this.$store.getters['character/navigation/sideNavbarComponent']
    }
  }
}
</script>
