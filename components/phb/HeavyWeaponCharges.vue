<template lang="pug">
  rule-card
    span(slot="header") Heavy Weapon Charges
    template(slot="text")
      h3.title Capacity: (based on weapon)
      p.
        See the #[nuxt-link(to="/phb/weapons") weapon list] for the number of charges a heavy weapon has.
      h3.title Resupplying: ~5,000 credits
      p.
        If you've got your hands on a heavy weapon, you're either a military specialist or damn lucky you survived the
        battle. It's not easy resupplying your charges. You'll need to have some serious military or black market connections.
        If military, you might get special permission to keep the weapon and granted a steady stream of charges (once per long rest).
        That's between you and your Galaxy Master.
      p.
        Otherwise, you'll have to pay a pretty penny on the black-market to recharge your Heavy Weapon (5,000-7,000 credits for a
        complete resupply of charges). In most cases, it's easier to scavenge or steal ammo. Or simply leave the damn thing were
        you found it.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
