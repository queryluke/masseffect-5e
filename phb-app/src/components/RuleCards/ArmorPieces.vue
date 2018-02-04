<template lang="pug">
  rule-card(id="armorPieces")
    span(slot="header") Armor isn't ALL-IN-ONE
    template(slot="text")
      p.
        In Mass Effect 5e, there are 4 armor placements: #[strong Head], #[strong Chest], #[strong Arms], and #[strong Legs].
        You can mix and match armor types (#[strong Light], #[strong Medium], #[strong Heavy]). This makes the array of
        Armor Class (AC) possibilities a bit more complex.
      p.headline.mb-0 AC Breakdown
      table.table
        thead.text-xs-left
          tr
            th Armor Type Mix
            th AC
            th Min STR
            th Stealth
        tbody
          tr
            td Empty armor slot
            td -1 AC
            td
            td
          tr
            td All Light
            td 11 + Dexterity Modifier
            td -
            td -
          tr
            td Medium & Light
            td 12 + Dexterity Modifier (max 2)
            td 8
            td -
          tr
            td All Medium
            td 13 + Dexterity Modifier (max 2)
            td 10
            td -
          tr
            td A least 1 Heavy, Mix of Medium & Light
            td 14
            td 11
            td Disadvantage
          tr
            td 1 Heavy, All other Medium
            td 15
            td 12
            td Disadvantage
          tr
            td 2 Heavy & 2 Medium
            td 16
            td 13
            td Disadvantage
          tr
            td 3 Heavy & 1 Medium
            td 17
            td 14
            td Disadvantage
          tr
            td All Heavy
            td 18
            td 15
            td Disadvantage
      v-alert(type="warning" v-bind:value="true").
        You must be proficient in an armor type (Light, Medium, or Heavy) to wear it.
      p.headline.mt-3 Variant: Encumbrance
      p.mb-0 If using the #[a(v-on:click="showGlobalDialog('armor-overview')") Encumbrance rule], use the following to calculate your armor weight.
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
            td 1
            td 2
            td 0
          tr
            td #[strong Medium]
            td 1
            td 3
            td 1
          tr
            td #[strong Heavy]
            td 2
            td 4
            td 2
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'ArmorPieces',
    components: { RuleCard },
  };
</script>
