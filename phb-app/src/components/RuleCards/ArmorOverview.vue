<template lang="pug">
  rule-card(id="armorOverview")
    span(slot="header") Overview
    template(slot="text")
      ul.list
        li Armor proficiency is based on race.
        li You cannot wear a piece of armor unless you are proficient in that armor's type.
        li Armor types can be mixed
        li Armor can be custom made or modified with powerful augmentations.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'ArmorOverview',
    components: { RuleCard },
  };
</script>
