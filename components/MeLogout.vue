<template>
  <v-overlay :value="logoutOverlay" opacity="0.8">
    <!-- freaking sign out hack -->
    <div class="text-center">
      <v-progress-circular indeterminate color="primary" size="64" />
      <div class="text-h6">
        <div v-if="logoutState > 0" class="mt-6">
          <code>
            Running omni_tool_backup.exe...
          </code>
        </div>
        <div v-if="logoutState > 1" class="mt-6">
          <code>
            Geth activity detected, rerouting...
          </code>
        </div>
        <div v-if="logoutState > 2" class="mt-6">
          <code>
            Backup successful...closing extranet connection...
          </code>
        </div>
      </div>
    </div>
    <div id="signOutHack" style="visibility: hidden" />
  </v-overlay>
</template>

<script>
export default {
  computed: {
    logoutOverlay () {
      return this.$store.state.auth.logoutOverlay
    },
    logoutState () {
      return this.$store.state.auth.logoutState
    }
  }
}
</script>
