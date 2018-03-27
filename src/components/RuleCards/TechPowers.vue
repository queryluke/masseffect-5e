<template lang="pug">
  rule-card
    span(slot="header") Tech Powers
    template(slot="text")
      p.
        Tech points are a casting resource for Engineers, Infiltrators, and Sentinels. You spend these points to fuel various
        tech powers. They represent your Omni-tool's power capacity. When you spend a tech point, it is unavailable until you
        finish a short rest, at the end of which you recharge 1d4 tech points. Some armor mods and class feature increase this
        recharge rate. At the end of a long rest, you recharge all your tech points.
      p.
        Tech powers are unique in that most have a variable tech point cost. You can choose to spend a lot or only a few
        tech points when casting a power, much like you can cast spells using higher level spell slots. However, there
        is a limit on how many tech points you can spent to fuel a tech power. This limit is indicated in the Max TP column
        of your class progression table.
      p.
        Finally, Intelligence is your tech (spellcasting) modifier.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'TechPowers',
    components: { RuleCard }
  };
</script>
