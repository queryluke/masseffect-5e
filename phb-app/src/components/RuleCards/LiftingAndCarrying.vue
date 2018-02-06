<template lang="pug">
  rule-card(id="liftingAndCarrying")
    span(slot="header") Lifting and Carrying
    template(slot="text")
      p.
        Your Strength score determines the amount of weight you can bear. The following terms define what you can lift or carry.
        These weights have been adjusted from 5th Edition to work with kilograms (kg) instead of pounds (lbs).
      dl
        dt Carry Capacity
        dd.
          You can carry capacity is your Strength score multiplied by 5. If you are wearing armor, your carry capacity
          is your Strength score multiplied by 10 (due to the built-in servos and pneumatics). This score is not effected
          by weapons or armor (see below).
        dt Push, Drag, Lift
        dd.
          You can push, drag, or lift a weight in kgs up to twice your carrying capacity or 10 (20 w/ armor) times your Strength score.
          While pushing or dragging weight in excess of your carrying capacity, your speed drops to 2 meters.
        dt Size & Strength
        dd.
          Larger creatures can bear more weight, whereas Tiny creatures can carry less. For each size category above Medium,
          double the creature's carrying capacity and the amount it can push, drag, or lift. For a Tiny creature, halve these weights.
        dt Weapon Slots
        dd.
          You have 2 weapon slots and can equip a single weapon in either slot. Weapons equipped in a slot do not affect your carry capacity.
          Any additional weapons you pick up count against your Carry Capacity.
        dt Armor
        dd The armor matrix has a minimum Strength score for the combination of armor types.
      p.headline.mt-2 Variant: Encumbrance
      p.
        The lifting an carrying rules attempt to keep the simplicity of 5th edition, with the added restrictions of weapon capacity.
        Here is a variant if you are looking for more detailed rules for determining how a character is hindered by the weight of equipment.
        When you use this variant, ignore the minimum Strength column of the Armor table.
      p Your #[strong carry weight] is equal to your Stength score.
      p.
        Each weapon and armor piece has a weight. If your total weight from all weapons and armor is in excess of your
        carry weight, you are #[strong encumbered], which means your speed drops by 4m.
      p.
        If your total weight from all weapons and armor is in excess of Strength score + 10,
        you are instead heavily encumbered, which means your speed drops by 10m and you have disadvantage on ability
        checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'LiftingAndCarrying',
    components: { RuleCard },
  };
</script>
