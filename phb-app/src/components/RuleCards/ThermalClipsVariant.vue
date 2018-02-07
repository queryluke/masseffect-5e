<template lang="pug">
  rule-card
    span(slot="header") Variant: Thermal Clips
    template(slot="text")
      p.
        For an additional challenge, you can have your player's keep track of all their thermal clips (specialized or not).
        For GMs, if you're using this rule, you can allow players to bring thermal clip backpacks if they're venturing out
        into the wilderness. But if your players are fighting NPCs that use thermal clips, they should be able to loot
        plenty of thermal clips after the battle.
      p.headline Capacity: 10
      p.
        All armor comes standard with 10 thermal clip slots. Some armor and mods allow you to increase this amount. Any thermal
        clip slot can be used for either standard or specialized thermal clips.
      p.headline Resupply: Common
      p.
        You can resupply all of you standard thermal clips at a gun shop or military depot for 500 credits. Specialized clips
        still cost 500 credits each.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'ThermalClipsVariant',
    components: { RuleCard },
  };
</script>
