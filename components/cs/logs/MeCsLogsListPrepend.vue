<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>Roll Log</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action @click="clearLogs">
      <v-btn x-small color="red darken-4">
        Clear Logs
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'MeCsLogsListPrepend',
  computed: {
    logs () {
      return this.$store.getters['character/logs/logs'] || []
    }
  },
  methods: {
    clearLogs () {
      return this.$store.dispatch('character/logs/LOG_DESTROY')
    }
  }
}
</script>
