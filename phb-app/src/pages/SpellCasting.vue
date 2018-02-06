<template lang="pug">
  div
    h2.display-3 Spell Casting
    p.
      Biotics, Tech powers and Combat abilities
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '../components/RuleCards';

  export default {
    name: 'SpellCasting',
    components: { RuleCards },
    data() {
      return {
        rules: [
          'ability-nomenclature',
          'biotics',
          'tech-powers',
          'combat-powers',
          'spell-save-dc'
        ]
      };
    }
  };
</script>
