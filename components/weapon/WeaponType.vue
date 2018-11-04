<template lang="pug">
  v-avatar(size="30px" tile v-bind:class="rarityColors[weapon.rarity]")
    img(:src="`/images/weapons/${type}.svg`" v-bind:alt="weapon.type")
</template>

<script>
  export default {
    props: {
      weapon: {
        type: Object,
        default: () => { return {} }
      }
    },
    data () {
      return {
        type: '',
        rarityColors: {
          'Common': 'grey lighten-2',
          'Uncommon': 'green accent-2',
          'Rare': 'orange accent-2',
          'Very Rare': 'deep-purple accent-1'
        }
      }
    },
    created () {
      this.type = this.weapon.type.replace(/\s/, '_').toLowerCase()
    }
  }
</script>

<style>
  .badge:after {
    font-size: 8px;
    height: 12px;
    width: 12px;
  }
</style>
