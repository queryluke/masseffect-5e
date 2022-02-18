<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      vertical
      right
      timeout="-1"
      max-height="400px"
    >
      <me-cs-log-entry v-for="(log, index) in logs.slice().reverse()" :data="log.data" :key="index" />

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false
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
        const container = this.$el.querySelector('.v-snack__content')
        container.scrollTop = 0
      }
    }
  }
}
</script>

<style lang="scss">
.v-snack__content {
  width: 100%;
}
</style>
