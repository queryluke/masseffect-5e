<template lang="pug">
  rule-card
    span(slot="header") Advancement Options
    template(slot="text")
      p.
        You class progression tables allow you to learn new Biotic, Tech, and Combat abilities. Instead of learning a new ability,
        you have the option of choosing an advancement option for a skill you've already learned.
      p.
        Once you've selected an advancement option, you cannot advance the ability again. In addition, you cannot learn and advance an
        ability in the same level. I.e., 1st level Adepts can learn up to three 1st level, biotic spells. They cannot, instead, learn two spells
        and advance one.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'AbilityNomenclature',
    components: { RuleCard }
  }
</script>
