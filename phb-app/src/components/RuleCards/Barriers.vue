<template lang="pug">
  rule-card
    span(slot="header") Barriers
    template(slot="text")
      p.
        Barrier is a cantrip available to Adepts and Vanguards. It generates Barrier Ticks which are both a casting
        resource and damage reduction mechanic. Barrier Ticks start at 0 and can be gained by casting Barrier or other abilities.
        You cannot have more barrier ticks than the amount indicated on your class progression table.
      p.title.mt-2 Using Barrier Ticks
      p.
        When you take damage, if you have any Barrier Ticks remaining, remove a Barrier Tick and reduce that dmg by 1d8.
        Some class features allow you to choose whether or not you want to expend a barrier tick when you take damage, otherwise a barrier tick is always removed when you take damage.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Barriers',
    components: { RuleCard }
  };
</script>
