<template lang="pug">
  rule-card
    span(slot="header") Medi-gel
    template(slot="text")
      p.
        As an action, use a medi-gel pack to expend one of your hit die. This can be done during combat.
      p.headline Capacity: 4
      p.
        All armor comes standard with 4 medi-gel. Some armor and mods allow you to increase this ammount.
      p.headline Resupply: Common
      p.
        Medi-gel (medical gel) is an all-purpose medicinal salve combining an anaesthetic and clotting agent used by
        paramedics, EMTs, and military personnel, produced by the Sirta Foundation. As long as your in a relatively
        civilized environment, you can resupply all of your medi-gel for 1,000 credits.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'MediGel',
    components: { RuleCard },
  };
</script>
