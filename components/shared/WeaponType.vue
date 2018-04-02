<template lang="pug">
  v-avatar(size="25px" tile v-bind:class="[weapon.rare ? 'deep-purple' : 'orange']").accent-2
    img(:src="`/images/weapons/${type}.svg`" v-bind:alt="weapon.type")
</template>

<script>
  export default {
    created () {
      this.type = this.weapon.type.replace(/\s/, '_').toLowerCase()
    },
    data () {
      return {
        type: ''
      }
    },
    props: ['weapon']
  }
</script>

<style>
  .badge:after {
    font-size: 8px;
    height: 12px;
    width: 12px;
  }
</style>
