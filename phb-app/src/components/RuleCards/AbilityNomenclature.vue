<template lang="pug">
  rule-card
    span(slot="header") Nomenclature
    template(slot="text")
      p.
        As a general rule, the word "Ability" as the unbrella term for all biotic spells, tech powers,
        combat powers, and class features. In addition, the term "Biotic Modifier" or "Tech Modifier" is synonymous
        with "Spellcasting Modifier."
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'AbilityNomenclature',
    components: { RuleCard }
  };
</script>
