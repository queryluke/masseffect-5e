<template>
  <div>
    <!--me-cs-radial-menu /-->
    <div class="open-log-btn">
      <!--v-btn @click="snackbar = true">
        LOGS
      </v-btn-->
    </div>
    <div class="text-center ma-2 snackbar-container" >
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
          <!--v-checkbox
            class="text-left"
            v-model="persist"
            :label="'Keep Log Open'"
          ></v-checkbox-->
          </div>
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
