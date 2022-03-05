<template>
  <div class="my-3 mx-2">
    <div v-if="logs.length">
      <v-scale-transition group tag="div">
        <template v-for="(entry, index) in logs">
          <div :key="`log-index-${index}`">
            <component :is="entry.component" :entry="entry" :is-last-entry="index === logsLength - 1" />
          </div>
        </template>
      </v-scale-transition>
    </div>
    <div v-else class="text-center">
      No Logs Found
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsLogsList',
  computed: {
    logs () {
      return (this.$store.getters['character/logs/logs'] || [])
    },
    logsLength () {
      return this.logs.length
    }
  },
  watch: {
    logsLength () {
      const parentElement = document.getElementById('meCsSideNav')
      const [element] = parentElement.getElementsByClassName('v-navigation-drawer__content')
      setTimeout(() => {
        element.scrollTop = 9999999
      }, 100)
    }
  }
}
</script>
