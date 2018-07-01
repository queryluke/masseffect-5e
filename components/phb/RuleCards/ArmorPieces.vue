<template lang="pug">
  rule-card(id="armorPieces")
    span(slot="header") Armor isn't ALL-IN-ONE
    template(slot="text")
      p.
        In Mass Effect 5e, there are 4 armor placements: #[strong Head], #[strong Chest], #[strong Arms], and #[strong Legs].
        Your base AC is 10 and each piece of armor provides a +AC bonus depending on its type and placement as listed in
        the #[strong Armor/AC] table below. Additionally, there are bonuses and limitations for the combination of armor
        types you are wearing, explained in the #[strong Bonues and Limitations] table.
      p.
        For simplicity's sake, you cannot mix armor #[em within] placements. I.e., you cannot have a heavy piece of on your
        right arm and a light piece of armor on your left.
      p.headline.mb-0 Armor / AC
      table.table
        thead.text-xs-left
          tr
            th Placement / Type
            th Light
            th Medium
            th Heavy
        tbody
          tr
            td Chest
            td +1
            td +2
            td +3
          tr
            td Arms & Legs
            td +0
            td +1
            td +2
          tr
            td Head
            td(colspan=3) Unless otherwise listed, headware provides no bonus
      p.headline.mb-0.mt-3 Bonues and Limitations
      p.mb-0 If you are wearing...
      table.table
        thead.text-xs-left
          tr
            th
            th DEX bonus
            th Min Str
            th Stealth
        tbody
          tr
            td ...one or more pieces of Heavy armor
            td none
            td 14
            td disadvantage
          tr
            td ...one or more pieces of Medium armor
            td Max +2 bonus from Dexterity modifier
            td 12
            td -
          tr
            td ...light or no armor
            td Add Dexterity modifier to your AC
            td -
            td -
      p.headline.mt-3 Variant: Encumberance
      p.mb-0 If using the #[a(v-on:click="showGlobalDialog('encumbrance')") Variant: Encumberance rule], use the following to calculate your armor weight.
      table.table
        thead.text-xs-left
          tr
            th
            th Head
            th Chest
            th Arms & Legs
        tbody
          tr
            td #[strong Light]
            td 2
            td 3
            td 1
          tr
            td #[strong Medium]
            td 2
            td 6
            td 2
          tr
            td #[strong Heavy]
            td 2
            td 10
            td 3
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'
  import {mapActions} from 'vuex'

  export default {
    components: { RuleCard },
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
