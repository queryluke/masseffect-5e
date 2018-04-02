<template lang="pug">
  div
    div(v-for="(item, index) of items" v-bind:key="index")
      p.headline {{ item.name }}
      p {{ item.description }}
      div(v-if="items.length > index + 1").hr
</template>

<script>
  export default {
    name: 'SubclassInfo',
    props: ['items'],
  };
</script>

