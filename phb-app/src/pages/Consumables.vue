<template lang="jade">
  div
    h2 Consumables
    p.
      coming soon
    rule-card
      span(slot="header") Grenades
      template(slot="text")
        p.

    rule-card
      span(slot="header") Special Thermal Clips
      template(slot="text")
        p.

    rule-card
      span(slot="header") Medigel
      template(slot="text")
        p.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'Consumables',
    components: { RuleCard }
  };
</script>
