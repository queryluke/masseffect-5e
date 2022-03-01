<template>
  <div>
    <v-navigation-drawer
      v-model="logNav"
      app
      clipped
      right
      style="width: 400px;"
      class="me-log-nav"
      disable-resize-watcher
    >
    <!--div class="me-log-nav-close-icon">
      <v-icon>mdi-close</v-icon>
    </div-->
      <me-cs-logs />
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'MeLogNav',
  computed: {
    logNav: {
      get () {
        const nav = this.$store.getters['character/logNav']
        return nav
      },
      set (value) {
        this.$store.commit('character/logNav', value)
      }
    },
    logs () {
      return this.$store.getters['character/logs'] || []
    }
  },
  watch: {
    logs (newVal, oldVal) {
      if (newVal && newVal.length && newVal.length !== oldVal.length) {
        this.logNav = true
        // need this to get the correct height after update
        setTimeout(() => {
          const container = this.$el.querySelector('.v-navigation-drawer__content')
          container.scrollTop = container.scrollHeight
        }, 200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.me-log-nav {
  overflow: visible;
}
.me-log-nav-close-icon {
  position: absolute;
  left: -40px;
}
</style>
