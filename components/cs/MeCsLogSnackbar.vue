<template>
  <div class="text-center ma-2 snackbar-container">
    <v-snackbar
      v-model="snackbar"
      vertical
      right
      timeout="-1"
      max-height="70vh"
    >
      <me-cs-logs />
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
</style>
