<template>
  <span>
    <img :src="`../assets/images/${type}/${name}.svg`" class="me-icon" :title="`${name}`">
  </span>
</template>

<script>
  export default {
    name: 'MeIcon',
    props: ['type','name'],
  };
</script>

<style>
  .me-icon {
    width: 100%;
  }
</style>
