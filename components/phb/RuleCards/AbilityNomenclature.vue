<template lang="pug">
  rule-card
    span(slot="header") Nomenclature
    template(slot="text")
      p.
        As a general rule, the word "Ability" is the unbrella term for all biotic spells, tech powers,
        combat powers, and class features. In addition, the term "Biotic Modifier" or "Tech Modifier" is synonymous
        with "Spellcasting Modifier."
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'

  export default {
    name: 'AbilityNomenclature',
    components: { RuleCard }
  }
</script>
