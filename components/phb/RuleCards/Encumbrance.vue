<template lang="pug">
  rule-card(id="liftingAndCarrying")
    span(slot="header") Variant: Encumberance
    template(slot="text")
      p.
        The lifting and carrying rules attempt to keep the simplicity of 5th edition, with the added restrictions of weapon capacity.
        Here is a variant if you are looking for more detailed rules for determining how a character is hindered by the weight of equipment.
        When you use this variant, ignore the minimum Strength column of the Armor table and ignore the weapon slot limitation.
      p Your #[strong carry weight is equal to two times your Stength score].
      p.
        Each weapon and armor piece has a weight. If your total weight from all weapons and armor is in excess of your
        carry weight, you are #[strong encumbered], which means your speed drops by 4m.
      p.
        If your total weight from all weapons and armor is in excess of four times your Strength score,
        you are instead #[strong heavily encumbered], which means your speed drops by 10m and you have disadvantage on ability
        checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
