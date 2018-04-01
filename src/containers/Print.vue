<template lang="pug">
  v-app
    div(id="print-grid")
      router-view(:key="$route.fullPath")
</template>

<script>

export default {
  name: 'Print',
};
</script>

<style lang="stylus">
  #print-grid
    width:8.5in;
</style>
