<template lang="pug">
  div
    h2.display-3 Consumables
    div(v-for="(rule, index) in rules")
      component(v-bind:is="rule")
</template>

<script>
  import RuleCards from '../components/RuleCards';

  export default {
    name: 'Consumables',
    components: RuleCards,
    data() {
      return {
        rules: [
          'medi-gel',
          'thermal-clips',
          'thermal-clips-variant',
          'grenades',
          'heavy-weapon-charges'
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
