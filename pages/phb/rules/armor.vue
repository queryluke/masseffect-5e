<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Armor
    p Armor is much more customizable in ME5e than in the base 5e ruleset.
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    ArmorOverview,
    ArmorPieces,
    ArmorCustomization
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      ArmorOverview,
      ArmorPieces,
      ArmorCustomization
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Armor',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e\'s armor system is a bit more complex than D&D 5th edition. Learn how to gear up properly.' }
        ]
      }
    },
    layout: 'phb-rules'
  }
</script>
