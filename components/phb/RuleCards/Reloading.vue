<template lang="pug">
  rule-card
    span(slot="header") New Combat Action: Reload
    template(slot="text")
      p.
        When you take the Reload action, you add a new Thermal Clip into your equipped weapon.
      p.title Rapid Reload
      p.
        After taking the Reload action, if you have not taken a bonus action this turn, you may attempt a DC 15 Dexterity (Sleight of Hand) check.
        On a success, you reload your currently equipped weapon as bonus action, and my choose a different action to make this turn. On a failure
        you reload the weapon as your action. On a critical failure, the thermal clip drops from your hands and your weapon is not reloaded.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'Reloading',
    components: { RuleCard }
  }
</script>
