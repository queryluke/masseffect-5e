<template lang="pug">
  rule-card
    span(slot="header") Medi-gel
    template(slot="text")
      p.headline Capacity: 4
      p.
        All armor comes standard with a capacity for 4 medi-gel. Some armor and mods allow you to increase this ammount.
      p.
        In combat, using Medi-gel is the same as using an item: as an action, use a medi-gel pack on yourself or a willing creature within 2m. The target regains 2d4 + 2 hit points.
      p.
        Medi-gel can come in a variety of potencies.
      table.table
        thead
          tr
            th Type
            th Rarity
            th HP Regained
        tbody
          tr
            td Standard
            td Common
            td 2d4 + 2
          tr
            td Enhanced
            td Uncommon
            td 4d4 + 4
          tr
            td Superior
            td Rare
            td 8d4 + 8
          tr
            td Ultimate
            td Very Rare
            td 10d4 + 20
      p.headline Resupply: Common
      p.
        Medi-gel (medical gel) is an all-purpose medicinal salve combining an anaesthetic and clotting agent used by
        paramedics, EMTs, and military personnel, produced by the Sirta Foundation. As long as you're in a relatively
        civilized environment, you can resupply all of your standard medi-gel for 500 credits.
      p.
        However, more advanced versions of Medi-gel are increasingly rare and will require special connections to purchase
        or, possibly, trying to augment your current cache.
</template>

<script>
  import RuleCard from './../RuleCard.vue';

  export default {
    components: { RuleCard },
    name: 'MediGel'
  };
</script>
