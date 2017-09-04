<template>
  <span>
    <img :src="`assets/aoe/${shape}.svg`" class="aoe-icon" :title="`${shape}`">
  </span>
</template>

<script>
  export default {
    name: 'AoeIcon',
    props: ['shape'],
  };
</script>

<style>
  .aoe-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
</style>
