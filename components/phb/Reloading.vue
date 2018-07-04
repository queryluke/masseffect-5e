<template lang="pug">
  rule-card(id="reloading")
    span(slot="header") New Combat Action: Reload
    template(slot="text")
      p.
        When you take the Reload Action, you expend a Thermal Clip from your inventory and insert it into the weapon
        you're currently holding, treturning the weapon's heat to its maximum value.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
