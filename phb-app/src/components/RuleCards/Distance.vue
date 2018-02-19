<template lang="pug">
  rule-card
    span(slot="header") Distance
    template(slot="text")
      p.
        Mass Effect 5e uses meters instead of feet. Why? Because this is set in the future and it's sci-fi and using metric
        make more sense. The general rule of thumb is that 5ft = 2m. Or, if you're using a playmat, 2m = 1 space.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Distance',
    components: { RuleCard },
  };
</script>
