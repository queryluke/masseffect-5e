<template lang="pug">
  rule-card
    span(slot="header") Distance
    template(slot="text")
      p.headline 5ft = 2m
      p.headline Playmat: 2m = 1 square
      p.
        Mass Effect 5e uses meters instead of feet. Why? Because this is set in the future, and it's sci-fi, and using metric
        make more sense.
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
