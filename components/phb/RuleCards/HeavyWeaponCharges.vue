<template lang="pug">
  rule-card
    span(slot="header") Heavy Weapon Charges
    template(slot="text")
      p.headline Capacity: (based on weapon)
      p.
        See the weapon list for the number of charges a heavy weapon has.
      p.headline Resupply: Very Rare
      p.
        If you've got your hands on a heavy weapon, you're either a military specialist or damn lucky you survived the
        battle. It's not easy resupplying your charges. You'll need to have some serious military or black market connections.
        If military, you might get special permission to keep the weapon and granted a steady stream of charges (once per long rest).
        That's between you and your Galaxy Master.
      p.
        Otherwise, you'll have to pay a pretty penny on the black market to recharge your Heavy Weapon (around 20,000 credits for a
        complete resupply of charges). In most cases, it's easier to scavenge or steal ammo. Or simply leave the damn thing were
        you found it.
      v-btn(to="/weapons").mt-3 Weapon List
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
