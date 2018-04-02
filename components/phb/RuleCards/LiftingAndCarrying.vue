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
          is your Strength score multiplied by 10 (due to the built-in servos and pneumatics). This score is not affected
          by weapons or armor (see below).
        dt Push, Drag, Lift
        dd.
          You can push, drag, or lift a weight in kgs up to twice your carrying capacity or 10 (20 w/ armor) times your Strength score.
          While pushing or dragging weight in excess of your carrying capacity, your speed drops to 2 meters.
        dt Size & Strength
        dd.
          Larger creatures can bear more weight, whereas Tiny creatures can carry less. For each size category above Medium,
          double the creature's carrying capacity and the amount it can push, drag, or lift. For a Tiny creature, halve these weights.
        dt Weapons
        dd.
          You have 2 weapon slots and can equip a single weapon in either slot. Weapons equipped in a slot do not affect your carry capacity.
          Any additional weapons you pick up count against your carry capacity.
        dt Armor
        dd The #[a(v-on:click="showGlobalDialog('armor-pieces')") armor matrix] has a minimum Strength score for the combination of armor types. You must meet or exceed that score.
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'
  import {mapActions} from 'vuex'

  export default {
    components: { RuleCard },
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
