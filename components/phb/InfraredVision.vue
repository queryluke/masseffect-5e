<template lang="pug">
  rule-card(id="infrared-vision")
    span(slot="header") Infrared Vision
    template(slot="text")
      p.
        A creature with infrared vision, out to a specific range, can see in darkness, is unaffected by lightly or heavily obscured areas,
        and see invisible and hidden creatures and objects that give off heat.
      p.
        However, the creature cannot see beyond intense heat sources and is effectively blind when looking at an intense heat source.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
