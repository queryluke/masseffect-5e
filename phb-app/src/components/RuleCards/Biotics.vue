<template lang="pug">
  rule-card
    span(slot="header") Biotic Spells
    template(slot="text")
      p.
        Work almost identically to spells in D&D 5th Edition. Wisdom is your biotic (spellcasting) modifier. You have spell slots
        and regain all of your spell slots after a long rest.
      p.
        The primary difference is that you do not need to prepare spells. Once you have learned a spell, you're considered
        to always have it prepared.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Biotics',
    components: { RuleCard }
  };
</script>
