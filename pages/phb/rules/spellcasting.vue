<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Spellcasting
    p Biotics, Tech, & Combat Powers
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    AbilityNomenclature,
    AdvancementOptions,
    PrimersAndDetonators
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      AbilityNomenclature,
      AdvancementOptions,
      PrimersAndDetonators
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Spellcasting',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn how to PEW PEW correctly with our spellcasting guide.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
