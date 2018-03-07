<template lang="pug">
  rule-card
    span(slot="header") New Combat Action: Apply Medi-gel
    template(slot="text")
      p.
        As an action, use a medi-gel pack on yourself or a willing creature within 2m. The targeted creatue rolls 1 die
        equal to its hit die and gains that many hit points.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    components: { RuleCard },
    name: 'ApplyMediGel'
  };
</script>
