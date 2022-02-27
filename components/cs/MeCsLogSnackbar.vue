<template>
  <div>
    <div class="fixed-menu">
      <v-row>
        <v-col class="pa-0">
          <me-cs-die-roller-menu />
        </v-col>
        <v-col class="pa-0">
          <v-btn class="mt-1 ml-2" fab color="secondary" @click.stop="snackbar = true">
            <v-icon>mdi-text</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="text-center ma-2 snackbar-container" >
      <v-snackbar
        v-model="snackbar"
        vertical
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
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    persist: true,
    timeoutMax: 8000
  }),
  computed: {
    logs () {
      return this.$store.getters['character/logs'] || []
    }
  },
  watch: {
    logs (newVal, oldVal) {
      if (newVal && newVal.length && newVal.length !== oldVal.length) {
        this.snackbar = true
        // need this to get the correct height after update
        setTimeout(() => {
          const container = this.$el.querySelector('.v-snack__content')
          container.scrollTop = container.scrollHeight
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss">
.fixed-menu {
  position: fixed;
  left: 300px;
  bottom: 16px;
  z-index: 300;
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
