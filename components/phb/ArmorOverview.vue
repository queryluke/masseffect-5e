<template lang="pug">
  rule-card(id="armor-overview")
    span(slot="header") Overview
    template(slot="text")
      p.
        There are 2 major armor changes:
      ul.pl-3
        li Armor types can be mixed
        li Armor can be custom made or modified with powerful augmentations.
      p.mt-3.
        Just like 5th edition, anyone can put on armor. However, only those proficient in the armor type know how to wear it effectively.
        Your class gives you proficiency with certain types of armor (light, medium, or heavy). If you are wearing 2 or more
        pieces of armor that you lack proficiency with, you have disadvantage on any ability check, saving throw, or Attack roll that
        involves Strength or Dexterity. If you are wearing 4 pieces of armor you lack proficiency with, you cannot cast
        Biotics or Tech and Combat powers.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
