<template>
  <v-overlay absolute :value="maxed" opacity="0.9" :color="color" z-index="4">
    <v-icon :size="small ? 56 : 100">
      {{ icon }}
    </v-icon>
    <div v-if="successes === 3" class="text-center text-button" :class="{ 'mt-n4': $vuetify.breakpoint.smAndDown }">
      Stable
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: 'MeCsHealthDeadStableOverlay',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    deathSaves () {
      return this.$store.getters['character/currentStats'].deathSaves
    },
    failures () {
      return this.deathSaves?.failures || 0
    },
    successes () {
      return this.deathSaves?.successes || 0
    },
    maxed () {
      return this.failures === 3 || this.successes === 3
    },
    icon () {
      return this.failures === 3 ? 'mdi-skull' : 'mdi-heart-pulse'
    },
    color () {
      return this.failures === 3 ? 'red darken-4' : 'green darken-1'
    }
  }
}
</script>
