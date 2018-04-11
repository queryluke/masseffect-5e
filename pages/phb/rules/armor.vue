<template lang="pug">
  v-container
    h2.display-3 Armor
    p Armor is much more customizable in ME5e than in the base 5e ruleset.
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
          'armor-overview',
          'armor-pieces',
          'armor-customization',
          'creating-new-armor'
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Armor',
        meta: [
          { hid: 'description', name: 'description', content: 'Information about the armor mechanics in Mass Effect 5e' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
