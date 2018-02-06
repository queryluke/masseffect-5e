<template lang="pug">
  rule-card
    span(slot="header") New Combat Action: Reloading
    template(slot="text")
      p.
        As detailed below, standard weapons use Thermal Clips and have Heat. If the weapon runs out of Heat, you must reload it
        before you can fire it again. Reloading a weapon is a combat action.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Reloading',
    components: { RuleCard }
  };
</script>
