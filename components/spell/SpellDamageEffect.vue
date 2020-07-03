<template lang="pug">
  span(v-if="spell.effect.includes('damage')") {{ spell.damageType[0] }}
    span(v-if="spell.damageType.length > 1 || spell.effect.length > 1") (...)
  span(v-else) {{ spell.effect[0] }}
    span(v-if="spell.effect.length > 1") (...)
</template>

<script>
export default {
  props: {
    spell: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
