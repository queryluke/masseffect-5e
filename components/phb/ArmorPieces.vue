<template lang="pug">
  rule-card(id="armor-pieces")
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
        thead
          tr
            th Placement / Type
            th Light
            th Medium
            th Heavy
        tbody
          tr
            td(data-table-key="Placement") Chest
            td(data-table-key="Light") +1
            td(data-table-key="Medium") +2
            td(data-table-key="Heavy") +3
          tr
            td(data-table-key="Placement") Arms & Legs
            td(data-table-key="Light") +0
            td(data-table-key="Medium") +1
            td(data-table-key="Heavy") +2
          tr
            td(data-table-key="Placement") Head
            td(colspan=3) Unless otherwise listed, headware provides no bonus
      p.headline.mb-0.mt-3 Bonues and Limitations
      p.mb-0 If you are wearing...
      table.table
        thead
          tr
            th
            th DEX bonus
            th Min STR
            th Stealth
        tbody
          tr
            td ...one or more pieces of Heavy armor
            td(data-table-key="DEX bonus") none
            td(data-table-key="Min STR") 14
            td(data-table-key="Stealth") disadvantage
          tr
            td ...one or more pieces of Medium armor
            td(data-table-key="DEX bonus") Max +2 bonus from Dexterity modifier
            td(data-table-key="Min STR") 12
            td(data-table-key="Stealth") -
          tr
            td ...light or no armor
            td(data-table-key="DEX bonus") Add Dexterity modifier to your AC
            td(data-table-key="Min STR") -
            td(data-table-key="Stealth") -
      p.headline.mt-3 Variant: Encumberance
      p.mb-0 If using the #[nuxt-link(to="/phb/rules/general#encumbrance") Variant: Encumbrance rule], use the following to calculate your armor weight.
      table.table
        thead
          tr
            th Placement / Type
            th Light
            th Medium
            th Heavy
        tbody
          tr
            td(data-table-key="Placement") Chest
            td(data-table-key="Light") 3
            td(data-table-key="Medium") 6
            td(data-table-key="Heavy") 10
          tr
            td(data-table-key="Placement") Arms & Legs
            td(data-table-key="Light") 1
            td(data-table-key="Medium") 2
            td(data-table-key="Heavy") 3
          tr
            td(data-table-key="Placement") Head
            td(colspan=3) 2
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import {mapActions} from 'vuex'

  export default {
    components: { RuleCard },
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
