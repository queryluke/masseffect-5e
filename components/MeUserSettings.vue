<template>
  <v-list dense>
    <v-subheader>{{ $t('settings.label') }}</v-subheader>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ $t('settings.mode') }}: {{ darkMode ? $t('settings.dark') : $t('settings.light') }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="toggleDarkMode">
          <v-icon>{{ darkModeIcon }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ $t('settings.units') }}: {{ imperial ? $t('settings.imperial') : $t('settings.metric') }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="imperial" inset dense />
      </v-list-item-action>
    </v-list-item>
    <!--
    <me-lang-picker activator="listItem" />
    -->
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
      async set (value) {
        await this.$store.dispatch('user/SET_IMPERIAL', value)
      }
    }
  },
  methods: {
    async toggleDarkMode () {
      await this.$store.dispatch('user/TOGGLE_DARK_MODE')
      this.$vuetify.theme.dark = this.$store.getters['user/darkMode']
    }
  }
}
</script>
