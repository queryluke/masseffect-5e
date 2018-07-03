<template lang="pug">
  rule-card
    span(slot="header") Weapon Stats
    template(slot="text")
      p.title.mt-2 Weight
      p.
        The weight if kilograms. Used to calculate your #[a(v-on:click="showGlobalDialog('lifting-and-carrying')") carry capacity] if you are carrying more
        weapons than the number of weapon slots allowed by your armor or if you are using the #[a(v-on:click="showGlobalDialog('encumbrance')") Variant: Encumbrance rule].
      p.title.mt-2 Range
      p.
        A weapon that can be used to make a ranged Attack has a range in parentheses. The range lists two numbers. The first is the weapon’s normal range in meters,
        and the second indicates the weapon’s long range. When attacking a target beyond normal range, you have disadvantage on the Attack roll.
        You can’t Attack a target beyond the weapon’s long range. Heavy weapons only have a single range. They cannot be used to make attacks on targets
        beyond their range.
      p.title.mt-2 Rate of Fire (Rof) & Damage
      p.
        On a successful ranged attack, the RoF of the weapon indicates number of dice you roll. The Damage indicates the die type.
        For example, the Acolyte pistol has a RoF of 1 and a Damage of d8, so your damage roll on a successful hit would be 1d8. For the
        Cerberus Harrier, which has a RoF of 4 and a Damage of 4, you would roll 4d4.
      p.title.mt-2 Heat
      p.
        Basically, the number of number of times you can fire before you need to reload. If the weapon has a heat of
        1 and you fire it, you must reload the thermal clip before firing it again. Reloading takes an action.
      p.
        In general, thermal clips are so plentiful that you do not need to keep track of them. However, you can
        play with the Variant: Thermal Clip rule for an additional challenge.
      p.
        For Heavy Weapons, Heat is substituted for Charges. You can use the heavy weapon a number of times equal to its
        charges.
    template(slot="actions")
      further-reading(:list="furtherReading")
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import FurtherReading from '~/components/cards/FurtherReading.vue'
  import {mapActions} from 'vuex'

  export default {
    components: { RuleCard, FurtherReading },
    data () {
      return {
        furtherReading: ['reloading', 'thermal-clips', 'heavy-weapon-charges']
      }
    },
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
