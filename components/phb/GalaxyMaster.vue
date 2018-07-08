<template lang="pug">
  rule-card(id="galaxy-master")
    span(slot="header") Galaxy Master
    template(slot="text")
      p.
        We call the Dungeon Master the Galaxy Master (tm tm tm)
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
