<template lang="pug">
  span
    v-img(:src="`/images/${type}/${name}.svg`" class="me-icon" v-bind:title="`${name}`")
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
  .me-icon {
    width: 100%;
  }
</style>
