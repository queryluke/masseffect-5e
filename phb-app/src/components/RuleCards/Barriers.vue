<template lang="pug">
  rule-card
    span(slot="header") Barriers
    template(slot="text")
      p.
        Barrier is a cantrip available to Adepts and Vanguards. It generates Barrier Ticks which are both a casting
        resource and damage reduction mechanic. Barrier Ticks start at 0 and can be gained by casting Barrier or other abilities.
        You cannot have more Barrier Tick than the amount indicated on your class progression table.
      p.headline.mt-2 Using Barrier Ticks
      p.
        When you take damage, if you have any Barrier Ticks remaining, remove a Barrier Tick and reduce that dmg by 1d8.
        Some class features allow you to choose whether or not you want to expend a Barrier Tick when you take damage.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Barriers',
    components: { RuleCard }
  };
</script>
