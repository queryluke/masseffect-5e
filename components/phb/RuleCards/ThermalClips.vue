<template lang="pug">
  rule-card
    span(slot="header") Thermal Clips
    template(slot="text")
      p.
        It is assumed that characters have an unlimited supply of thermal clips, as they can easily be located and
        scavenged from the battlefield during or after a firefight. However, your supply of #[strong Specialized] clips
        is limited.
      p.
        Specialized Thermal Clips can augment your weapon's damage and damage type. Once loaded, the augmentation
        lasts until you reload the weapon. When reloading, you can always pop in another specialized clip.
      p.headline Capacity: 6
      p.
        All armor comes standard with 6 thermal clip slots. Some armor and mods allow you to increase this amount.
      p.headline Resupply: Uncommon
      p.
        Nicer gun shops and military operations have a good stock of specialized thermal clips. Each specialized clip costs 500 credits.
        If you want to track standard thermal clips, see the Variant Thermal Clip Rules Below
      v-btn(to="/thermal-clips").mt-3 Thermal Clip List
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
