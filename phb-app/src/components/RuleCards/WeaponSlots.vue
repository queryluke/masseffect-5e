<template lang="pug">
  rule-card
    span(slot="header") Weapon Slots
    template(slot="text")
      p You can carry 2 weapons into combat, unless you have features or armor mods that allow you to carry more.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'WeaponSlots',
    components: { RuleCard }
  };
</script>
