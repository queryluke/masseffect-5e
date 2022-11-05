<template>
  <v-card flat color="transparent" class="text-center mx-auto" max-width="70px">
    <div class="text-caption">
      <small>Inspiration</small>
    </div>
    <v-card outlined width="48" height="30" class="mx-auto" @click="inspiration = !inspiration">
      <v-icon v-if="inspiration" color="orange darken-2">
        mdi-check-decagram
      </v-icon>
    </v-card>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsInspiration',
  computed: {
    ...mapGetters({
      currentStats: 'currentStats'
    }),
    inspiration: {
      get () {
        return this.currentStats.hasInspiration
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.hasInspiration', value })
      }
    }
  }
}
</script>
