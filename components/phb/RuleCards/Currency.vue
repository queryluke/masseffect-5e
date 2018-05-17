<template lang="pug">
  rule-card
    span(slot="header") Currency
    template(slot="text")
      p.
        “Credits” are the only type of currency in Mass Effect. Our rule of thumb is that 1 gold piece is about 100 credits.
        But this is more of a guideline and we adjust that ratio often throughtout our prices.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
