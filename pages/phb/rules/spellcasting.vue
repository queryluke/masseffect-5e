<template lang="pug">
  v-container
    h2.display-3 Spell Casting
    p.
      Biotics, Tech & Combat Powers
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '~/components/phb/RuleCards'

  export default {
    components: RuleCards,
    data () {
      return {
        rules: [
          'ability-nomenclature',
          'biotics',
          'tech-powers',
          'combat-powers',
          'spell-save-dc',
          'primers-and-detonators'
        ]
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Spellcasting',
        meta: [
          { hid: 'description', name: 'description', content: 'List of spellcasting differences between Mass Effect 5e and D&D 5th Edition' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
