<template lang="pug">
  rule-card
    span(slot="header") New Combat Action: Reload
    template(slot="text")
      p.
        When you take the Reload action, you add a new Thermal Clip into your equipped weapon. If you have not taken a bonus action
        this turn, you may attempt a DC 15 Dexterity (Sleight of Hand) check. On a success, you may reload your weapon
        as a bonus action. However, on a critical failure, the Thermal Clip drops from your hands and your weapon
        is not relaoded.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Reloading',
    components: { RuleCard }
  };
</script>
