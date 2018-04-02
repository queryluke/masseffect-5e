<template lang="pug">
  rule-card
    span(slot="header") Combat Powers
    template(slot="text")
      p.
        Combat powers can be learned by Soldiers and Infiltrators, but they rely on equipment rather than biotic amps or a
        beefed-up omni-tool. Instead of a casting cost, combat powers recharge on a short or long rest, similar to class features.
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'

  export default {
    name: 'CombatPowers',
    components: { RuleCard }
  }
</script>
