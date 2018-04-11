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
        If a target is beyond the weapon's range, the attack roll is made at a disadvantage. Ranges are an approximation and
        can be 2m (hip fire), 10m (close range), 20m (average range), 60m (long range), 120m (sniper range).
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
  import RuleCard from '~/components/shared/RuleCard.vue'
  import FurtherReading from '~/components/phb/RuleCards/FurtherReading.vue'
  import {mapActions} from 'vuex'

  export default {
    components: { RuleCard, FurtherReading },
    data () {
      return {
        furtherReading: ['reloading', 'thermal-clips-variant', 'heavy-weapon-charges']
      }
    },
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
