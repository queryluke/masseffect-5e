<template lang="pug">
  v-container
    h2.display-3 Weapons
    p.subtitle {{ description }}
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '~/components/phb'
  export default {
    components: RuleCards,
    data () {
      return {
        rules: [
          'weapon-stats',
          'reloading',
          'rapid-reload',
          'holstering-and-drawing',
          'weapon-slots',
          'weapon-proficiency',
          'weapon-attributes',
          'melee-weapons',
          'heavy-weapons',
          'weapon-customization'
        ],
        description: 'Guns! A major difference between Mass Effect 5e and D&D 5e is the emphasis on ranged combat with firearms. You can still make a very powerful melee-focused character, but most characters in this setting will be shooting instead of slapping.'
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Rules - Weapons',
        meta: [
          { hid: 'description', name: 'description', content: this.description }
        ]
      }
    },
    layout: 'phb'
  }
</script>
