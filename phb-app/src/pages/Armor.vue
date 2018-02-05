<template lang="pug">
  div
    h2.display-3 Armor
    p Armor is much more customizable in ME5e than in the base 5e ruleset.
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '../components/RuleCards';

  export default {
    name: 'Armor',
    components: RuleCards,
    data() {
      return {
        rules: [
          'armor-overview',
          'armor-proficiency',
          'armor-pieces',
          'armor-customization',
          'creating-new-armor'
        ]
      };
    },
    methods: {
      showGlobalDialog(component) {
        this.$emit('showGlobalDialog', component);
      }
    }
  };
</script>
