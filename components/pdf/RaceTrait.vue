<template lang="pug">
  div.race-trait #[strong {{ title }}.]&nbsp;
    span(v-if="text") {{ text }}
    me-element(v-if="element" v-bind:text="element").me-element
</template>

<script>
  import MeElement from '~/components/MeElement.vue'
  export default {
    components: {
      MeElement
    },
    props: ['title', 'text', 'element']
  }
</script>

<style>
  .race-trait {
    text-indent: 15px;
  }
  .race-trait .me-element, .race-trait .me-element div, .race-trait .me-element p {
    display: inline !important;
  }
</style>