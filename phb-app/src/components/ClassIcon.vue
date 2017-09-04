<template>
  <span>
    <img :src="`assets/classes/${classname}.svg`" class="class-icon" :title="`${classname}`">
  </span>
</template>

<script>
  export default {
    name: 'ClassIcon',
    props: ['classname'],
  };
</script>

<style>
  .class-icon {
    width: 100%;
  }
</style>
