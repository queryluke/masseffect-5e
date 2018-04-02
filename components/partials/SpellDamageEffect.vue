<template>
  <span v-if="spell.effect[0] === 'damage'">
    {{ spell.damage_type[0] }}
    <span v-if="spell.damage_type.length > 1 || spell.effect.length > 1">(...)</span>
  </span>
  <span v-else>
    {{ spell.effect[0] }}
    <span v-if="spell.effect.length > 1">(...)</span>
  </span>
</template>

<script>
  export default {
    props: ['spell']
  }
</script>

