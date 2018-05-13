<template lang="pug">
  v-container
    h2.display-3 Expenses
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '~/components/phb/RuleCards'

  export default {
    name: 'Armor',
    components: RuleCards,
    data () {
      return {
        rules: [
          'currency',
          'lifestyle-expenses',
          'cost-of-things',
          'buying-and-selling'
        ]
      }
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
