<template>
  <div>
    <div :class="'fixed-menu ' + (leftNav ? 'fixed-menu-with-nav' : '') ">
      {{leftNav}}
      <v-row>
        <v-col class="pa-0">
          <me-cs-die-roller-menu />
        </v-col>
        <v-col class="pa-0">
          <v-btn class="mt-1 ml-2" fab color="secondary" @click.stop="logNav = !logNav">
            <v-icon>{{logNav ? 'mdi-close' : 'mdi-text'}}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!--div class="text-center ma-2 snackbar-container" >
      <v-snackbar
        v-model="snackbar"
        vertical
        right
        :timeout="-1"
        max-height="70vh"
        @click="persist = true"
      >
        <me-cs-logs />
        <template v-slot:action="{ attrs }">
          <div>
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false; persist=false;"
            >
              Close
            </v-btn>
          </div>
        </template>
      </v-snackbar>
    </div-->
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    persist: true,
    timeoutMax: 8000
  }),
  props: {
    left: {
      type: Number,
      default: () => 300
    }
  },
  computed: {
    logs () {
      return this.$store.getters['character/logs'] || []
    },
    logNav: {
      get () {
        return this.$store.getters['character/logNav']
      },
      set (value) {
        this.$store.commit('character/logNav', value)
      }
    },
    leftNav () {
      const d = this.$store.getters.drawer
      return d
    }
  }
}
</script>

<style lang="scss">
.fixed-menu {
  position: fixed;
  left: 30px;
  bottom: 24px;
  z-index: 300;
}
.fixed-menu-with-nav {
  left: 300px;
}
.v-snack__content {
  width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
}
.snackbar-container {
  overflow: hidden;
}
.open-log-btn {
  position: fixed;
  top: 300px;
  left: 300px;
}
</style>
