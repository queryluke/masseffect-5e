<template lang="pug">
  div
    span(v-if="spell.concentration")
      span(v-if="!verbose")
        v-avatar(color="black" size="18" alt="concentration")
          span(class="white--text") C
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
      }
    }
  }
</script>
