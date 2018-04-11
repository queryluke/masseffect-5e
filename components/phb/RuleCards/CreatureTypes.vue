<template lang="pug">
  rule-card
    span(slot="header") Creature Types
    template(slot="text")
      p.
        There aren't enough spells and powers to justify making bonuses like "double damage to beast". In addition, many of the 5th Edition
        creature types don't make sense in the sci-fi setting (celestials, undead, fey, elemental, etc.). Instead there are only
        three creature types: Organic, Synthetic, and Synthorganic.
      p.
        Some abilities only effect organic or synthetic creatures (or deal increased damage to that type), as notated in the ability text.
        Synthorganic creatures are considered both synthetic and organic.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
