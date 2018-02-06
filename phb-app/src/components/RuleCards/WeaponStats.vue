<template lang="pug">
  rule-card
    span(slot="header") Weapon Stats
    template(slot="text")
      p.
        Some of these stats only apply to certain weapons.
      p.headline.mt-2 Weight
      p.
        Use this to calculate your Carry Capacity if using the Variant: Encumbrance rule.
      p.headline.mt-2 Range
      p.
        If a target is beyond the weapon's range, the attack roll is made at a disadvantage. Ranges are an approximation and
        can be 2m (beyond hip fire), 10m (close range), 20m (average range), 60m (long range).
        For the gun nuts out there, I get the fact that an assault rifle has a range of 300m, but unless you're a goddamn black belt
        in GunFu, you ain't gonna hit a moving target at 300m. Range, in this context, is a measure of weapon performance,
        kick, handling, scope, etc.
      p.headline.mt-2 Rate of Fire (Rof) & Damage
      p.
        On a successful ranged attack, the RoF of the weapon indicates number of dice you roll. The Damage indicates the die type.
        For example, the Acolyte pistol has a RoF of 1 and a Dmg of d8, so your damage roll on a successful hit would be 1d8. For the
        Cerberus Harrier, which has a RoF of 4 and a Dmg of 4, you would roll 4d4.
      p.headline.mt-2 Heat
      p.
        Basically, the number of number of times you can fire before you need to reload. If the weapon has a heat of
        1 and you fire it, you must reload the thermal clip before firing it again. Reloading takes an action.
      p.
        In general, standard thermal clips are so plentiful that you do not need to keep track of them. However, you can
        play with the #[router-link(to="/rules/consumables") Variant Thermal Clip] rule for an additional challenge.
      p.
        For Heavy Weapons, Heat is substituted for Charges. You can use the heavy weapon a number of times equal to its
        charges. See #[router-link(to="/rules/consumables") Consumables] for resupplying information.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'WeaponStats',
    components: { RuleCard }
  };
</script>
