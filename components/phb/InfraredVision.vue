<template lang="pug">
  rule-card(id="infrared-vision")
    span(slot="header") Infrared Vision
    template(slot="text")
      p.
        A creature with infrared vision can, out to a specific range, see in darkness, are unaffected by lightly or heavily obscured areas,
        see invisible and hidden creatures and objects that give off heat.
      p.
        However, the creature cannot see beyond intense heat sources and are effectively blinded towards anything beyond an intense heat source.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
