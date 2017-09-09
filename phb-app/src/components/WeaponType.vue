<template lang="jade">
  v-avatar(size="25px" tile v-bind:class="[weapon.rare ? 'deep-purple' : 'orange']").accent-2
    img(:src="`../assets/images/weapons/${type}.svg`" v-bind:alt="weapon.type")
</template>

<script>
  export default {
    name: 'WeaponType',
    props: ['weapon'],
    created () {
      this.type = this.weapon.type.replace(/\s/,'_').toLowerCase();
    },
    data () {
      return {
        type: ''
      }
    }
  };
</script>

<style>
  .badge:after {
    font-size: 8px;
    height: 12px;
    width: 12px;
  }
</style>
