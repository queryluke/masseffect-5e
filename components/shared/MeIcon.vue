<template>
  <span>
    <img :src="`/images/${type}/${name}.svg`" class="me-icon" :title="`${name}`">
  </span>
</template>

<script>
  export default {
    props: ['type', 'name']
  }
</script>

<style>
  .me-icon {
    width: 100%;
  }
</style>
