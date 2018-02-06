<template lang="pug">
  div
    h2.display-3 Weapons
    p.
      Guns! A major difference between ME5e and base 5e is the emphasis on ranged combat with firearms. You can still make a pretty
      bad ass melee build, but most people will be shooting instead of slapping.
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '../components/RuleCards';
  export default {
    name: 'WeaponRules',
    components: RuleCards,
    data() {
      return {
        rules: [
          'reloading',
          'holstering-and-drawing',
          'weapon-slots',
          'weapon-proficiency',
          'weapon-stats',
          'weapon-attributes',
          'melee-weapons',
          'heavy-weapons'
        ]
      };
    }
  };
</script>
