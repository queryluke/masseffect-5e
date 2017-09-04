<template>
  <span v-if="spell.effect[0] === 'damage'">
    {{ spell['damage-type'][0] }}
    <span v-if="spell['damage-type'].length > 1 || spell.effect.length > 1">(...)</span>
  </span>
  <span v-else>
    {{ spell.effect[0] }}
    <span v-if="spell.effect.length > 1">(...)</span>
  </span>
</template>

<script>
  export default {
    name: 'SpellDamageEffect',
    props: ['spell'],
  };
</script>

