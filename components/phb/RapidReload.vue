<template lang="pug">
  rule-card(id="rapid-reload")
    span(slot="header") Variant: Rapid Reload
    template(slot="text")
      p.
        At the start of your turn, if you are holding only a single weapon, you may use a Bonus Action to attempt a Rapid Reload.
        Make a DC 15 Dexterity (Sleight of Hand) check. On a success, you reload the weapon you're currently holding and may continue your turn as normal.
        On a failure, you must take the Reload action this turn.
        On a critical failure, the thermal clip drops from your hand, your weapon is not reloaded, and your lose your Action.
      p.subheading.
        #[em Why is this a variant rule?]
      p.
        Although there are class features and weapon mods that allow you to reload as a bonus action, we created this variant rule to
        give all classes a potential chance to reload as a bonus action. But this increases the potential rolls per combat, which can
        be cumbersome and distracting. So we leave it up to the GM and players to decide if this rule is right for their group.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
