<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down.mb-3 Expenses
    div(v-for="(rule, index) in pages[$route.name].rules" v-bind:key="index")
      component(v-bind:is="rule")
</template>

<script>
  // Rule Cards
  import {
    Currency,
    CostOfThings,
    BuyingAndSelling
  } from '~/components/phb/'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      Currency,
      CostOfThings,
      BuyingAndSelling
    },
    computed: {
      ...mapGetters('phb', {
        pages: 'pages'
      })
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Expenses',
        meta: [
          { hid: 'description', name: 'description', content: 'How to get and spend your credits in Mass Effect 5e' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
