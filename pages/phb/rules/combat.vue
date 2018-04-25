<template lang="pug">
  v-container
    h2.display-3 Combat
    p {{ description }}
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
          'shields',
          'barriers',
          'reloading',
          'primers-and-detonators',
          'creature-types',
          'damage-types',
          'conditions'
        ],
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
