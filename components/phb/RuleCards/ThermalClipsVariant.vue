<template lang="pug">
  rule-card
    span(slot="header") Variant: Thermal Clips
    template(slot="text")
      p.
        For an additional challenge, you can have your player's keep track of thermal clips. For Galaxy Masters, if you're
        using this rule, you can allow players to bring thermal clip backpacks if they're venturing out
        into the wilderness. But if your players are fighting NPCs that use thermal clips, they should be able to loot
        plenty of thermal clips after the battle.
      h3.title Using Thermal Clips
      p.
        When you reload your weapon, you expend a thermal clip.
      h3.title Armor Capacity: 10
      p.
        All armor comes standard with 10 thermal clip slots. Some armor and mods allow you to increase this amount.
      h3.title Resupplying: ~100 credits
      p.
        You can resupply all of your thermal clips at a gun shop or military depot for 500 credits.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
