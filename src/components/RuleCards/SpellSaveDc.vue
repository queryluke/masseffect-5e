<template lang="pug">
  rule-card
    span(slot="header") Spell Save DC
    template(slot="text")
      p.
        We still use the term Spell Save DC to refer to any saving throw DC that is prompted by an ability not just biotic spells.
      p.
        By default, your character's Spell Save DC is calculated as normal: 8 + proficiency bonus + spellcasting ability modifier. Some
        individual biotic/tech/combat abilities may have a Save DC that is calculated differently. In these cases, the Save DC is
        indicated in the ability description.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'SpellSaveDc',
    components: { RuleCard }
  };
</script>
