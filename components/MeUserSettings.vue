<template>
  <v-list dense>
    <v-subheader>Settings</v-subheader>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Mode: {{ darkMode ? 'Dark' : 'Light' }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="toggleDarkMode">
          <v-icon>{{ darkModeIcon }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Units: {{ imperial ? 'Imperial' : 'Metric' }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="imperial" inset dense />
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
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
    }
  },
  methods: {
    toggleDarkMode () {
      this.$store.dispatch('user/TOGGLE_DARK_MODE')
      this.$vuetify.theme.dark = this.$store.getters['user/darkMode']
    }
  }
}
</script>
