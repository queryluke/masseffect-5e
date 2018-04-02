<template>
  <span v-if="spell.concentration">
    <img src="/images/c.svg" alt="Concentration" title="Concentration" class="con-icon" v-if="!verbose">
    <span v-else>Concentration, up to</span> {{ spell.duration }}
  </span>
  <span v-else>
    {{ spell.duration }}
  </span>

</template>

<script>
  export default {
    props: ['spell', 'verbose']
  }
</script>

<style>
  .con-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
</style>
