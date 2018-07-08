<template lang="pug">
  rule-card(id="melee-weapons")
    span(slot="header") Melee Weapons
    template(slot="text")
      p.
        Melee weapons have the same attributes as D&D 5e weapons, i.e. finesse, light, thrown, etc. But melee weapons do have a strength
        requirement. If your STR attribute is less than the requirement, all attacks made with the weapon are made with disadvantage.
        This requirement is denoted in parentheses in the "STR Req" column of the handbook.
      p.
        Damage resulting from melee weapon attacks by-pass shields.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    name: 'MeleeWeapons',
    components: { RuleCard }
  }
</script>
