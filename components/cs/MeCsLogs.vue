<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Logs
    </me-cs-card-title>
    <div class="mt-3">
      <template v-if="logs.length">
        <div class="text-center pb-4">
          <v-btn @click="clearLogs()">Clear Logs</v-btn>
        </div>
        <transition-group name="list" tag="div">
            <me-cs-log-entry :data="entry.data" v-for="(entry, index) in logs.slice()" :key="index" class="pb-2"/>
        </transition-group>
        <div class="text-center pt-4">
          <v-btn @click="clearLogs()">Clear Logs</v-btn>
        </div>
      </template>
      <v-banner v-if="!logs.length">No Logs Found</v-banner>
    </div>
  </div>
</template>

<script>
import MeCsLogEntry from './MeCsLogEntry.vue'
export default {
  components: { MeCsLogEntry },
  name: 'MeCsLogs',
  computed: {
    logs () {
      return this.$store.getters['character/logs'] || []
    }
  },
  methods: {
    clearLogs () {
      return this.$store.dispatch('character/LOG_DESTROY')
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-compact {
  margin: 0 !important;
  max-width: 200px;
}
.v-card {
  width: 100%;
}
.list-enter, .list-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: opacity 0.5s ease;
}

.list-move {
  transition: transform 0.5s ease-out;
}
</style>
