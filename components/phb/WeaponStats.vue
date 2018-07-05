<template lang="pug">
  rule-card(id="weapon-stats")
    span(slot="header") Weapon Stats
    template(slot="text")
      p.title.mt-2 Weight
      p.
        The weight in kilograms. Used to calculate your #[nuxt-link(to="/phb/rules/general#lifting-and-carrying") carry capacity]
        if you are carrying more weapons than the number of weapon slots allowed by your armor or if you are using the
        #[nuxt-link(to="/phb/rules/general#encumbrance") Variant: Encumbrance rule].
      p.title.mt-2 Range
      p.
        A weapon that can be used to make a ranged Attack has a range in parentheses. The range lists two numbers. The first is the weapon’s normal range in meters,
        and the second indicates the weapon’s long range. When attacking a target beyond normal range, you have disadvantage on the Attack roll.
        You can’t Attack a target beyond the weapon’s long range. Heavy weapons only have a single range. They cannot be used to make attacks on targets
        beyond their range.
      p.title.mt-2 Heat
      p.
        Basically, the number of number of times you can fire before you need to reload. If the weapon has a heat of
        1 and you fire it, you must reload the weapon with a fresh thermal clip before firing it again. Reloading takes an action.
      p.
        For Heavy Weapons, Heat is substituted for Charges. You can use the heavy weapon a number of times equal to its
        charges.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
