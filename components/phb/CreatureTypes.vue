<template lang="pug">
  rule-card(id="creature-types")
    span(slot="header") Creature Types
    template(slot="text")
      p.
        There aren't enough spells and powers to justify making bonuses like "double damage to beast". In addition, many of the 5th Edition
        creature types don't make sense in the sci-fi setting (celestials, undead, fey, elemental, etc.). Instead there are only
        three creature types: Organic, Synthetic, and Synthorganic.
      p.
        Synthorganic creatures are considered both synthetic and organic.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
