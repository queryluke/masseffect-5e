<template lang="pug">
  rule-card
    span(slot="header") New Combat Action: Reload
    template(slot="text")
      p.
        When you take the Reload Action, you add a new Thermal Clip into your equipped weapon.
      p.title Rapid Reload (reaction)
      p.
        If you are only wielding one weapon, after taking the Reload Action, you may use your Reaction to attempt a DC 15 Dexterity (Sleight of Hand) check.
        On a success, you reload your currently equipped weapon and may choose a different Action. On a failure,
        you reload the weapon as your Action. On a critical failure, the thermal clip drops from your hands and your weapon is not reloaded.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'Reloading',
    components: { RuleCard }
  }
</script>
