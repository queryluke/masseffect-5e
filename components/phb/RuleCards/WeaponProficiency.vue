<template lang="pug">
  rule-card
    span(slot="header") Weapon Proficiencies
    template(slot="text")
      p.
        Just like in 5th Edition, you must be proficient with a weapon type to add your proficiency modifier to the attack roll.
        However, there are fewer weapon types (Assault Rifle, Heavy Pistol, SMG, Shotgun, Sniper Rifle, and Melee).
        Note that all melee weapons fall under one type, instead of being broken out by weapon type.
</template>

<script>
  import RuleCard from '~/components/partials/RuleCard.vue'

  export default {
    name: 'WeaponProficiency',
    components: { RuleCard }
  }
</script>
