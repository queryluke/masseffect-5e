<template lang="pug">
  div
    span(v-if="spell.concentration")
      span(v-if="!verbose")
        v-avatar(color="black", :size="cSize" alt="concentration")
          span(class="white--text") C
        span  ({{ minDuration }})
      span(v-else) Concentration, up to {{ spell.duration }}
    span(v-else) {{ spell.duration }}
</template>

<script>
export default {
  props: {
    spell: {
      type: Object,
      default: () => { return {} }
    },
    verbose: {
      type: Boolean,
      default: () => { return true }
    },
    cSize: {
      type: Number,
      default: 18
    }
  },
  computed: {
    minDuration () {
      return this.spell.duration.replace(/minute/, 'min')
    }
  }
}
</script>
