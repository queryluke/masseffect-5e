<template>
  <span v-if="spell.concentration">
    <img src="assets/c.svg" alt="Concentration" title="Concentration" class="con-icon"> {{ spell.duration }}
  </span>
  <span v-else>
    {{ spell.duration }}
  </span>

</template>

<script>
  export default {
    name: 'SpellDuration',
    props: ['spell'],
  };
</script>

<style>
  .con-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
</style>
