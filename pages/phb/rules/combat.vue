<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Combat
    p {{ description }}
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    Shields,
    Reloading,
    RapidReload,
    PrimersAndDetonators,
    CreatureTypes,
    DamageTypes,
    Conditions,
    Cover
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      Shields,
      Reloading,
      RapidReload,
      PrimersAndDetonators,
      CreatureTypes,
      DamageTypes,
      Conditions,
      Cover
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    data () {
      return {
        description: 'Combat is very similar to D&D 5th edition, with a few additional rules and defensive mechanics that add Mass Effect flavor to the system.'
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Combat',
        meta: [
          { hid: 'description', name: 'description', content: this.description }
        ]
      }
    },
    layout: 'phb'
  }
</script>
