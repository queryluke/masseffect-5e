<template lang="pug">
  div
    h2.display-3 Armor
    p Armor is much more customizable in ME5e than in the base 5e ruleset.
    rule-card
      span(slot="header") Overview
      template(slot="text")
        ul.list
          li Armor proficiency is based on race.
          li You cannot wear a piece of armor unless you are proficient in that armor's type.
          li Armor types can be mixed
          li Armor can be custom made or modified with powerful augmentations.
    rule-card
      span(slot="header") Armor proficiency is based on RACE not class.
      template(slot="text")
        p.
          Since the races come in a variety of shapes and sizes, it makes sense that armor manufacturers would only create sets and
          pieces they could sell. Based on a race's customs and military it may not have needed any heavy armor (or any light
          armor...I'm looking at you Krogans). In this way, race also plays a bit more of a role in you character's combat role and abilities.
          But this doesn't mean a Drell Soldier can't strap on some heavy armor. It means you'll
          have to take Feats to get yourself proficient in heavy armor. Or you can modify your light armor to have more AC.
    rule-card
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
        p.mb-0 If using the Encumbrance rule, use the following to calculate your armor weight.
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
    rule-card
      span(slot="header") Armor can be customized & created
      template(slot="text")
        p.
          Armor Customization is a new feature and provides a lot of the options that would be handled by Magical Items in traditional 5e.
          It costs a pretty penny, so creating armor might not be available to new characters, but as they progress, you should be able
          to afford major custom jobs.
        p.headline Creating Armor from Scratch
        p.
          When you create a piece of armor from scratch, you need to select the armor placement (Head, Chest, Arms, Legs),
          if you want to add additional mod slots, and if you need to customize the armor to fit your race. The following is a matrix
          of your options and the cost.
        table.table
          thead.text-xs-left
            tr
              th
              th Head
              th Chest
              th Arms & Legs
              th Standard Races
          tbody
            tr
              td #[strong Light]
              td 3,000
              td 8,000
              td 2,000
              td All races except, Geth, Krogan, and Turians
            tr
              td #[strong Medium]
              td 4,000
              td 10,000
              td 3,000
              td Asari, Batarian, Human, Quarian, Turian, Volus
            tr
              td #[strong Heavy]
              td 5,000
              td 12,000
              td 4,000
              td Batarian, Human, Krogan, Turian
            tr
              td Mod Slots #[em (max)]
              td 1 #[em (3)]
              td 2 #[em (3)]
              td 0 #[em (2)]
              td
        ul.list
          li #[strong Additional Mod Slots:] 20,000 credits
          li #[strong Race Custom Fitting:] 5,000 credits
        p
          v-btn(to="/armor/mods") Mod List
        div.hr
        p.headline Example
        p Medium Head Armor w/ 2 mod slots for a Drell
        table.table
          tbody
            tr
              td Medium Head
              td 4000
            tr
              td Additional Mod Slot (starts with 1)
              td 20000
            tr
              td Customized for Drell (not a standard race for Medium armor)
              td 5000
            tr
              td #[strong Total]
              td #[strong 29000 credits]
        p.headline.mt-3 Looted armor
        p.
          You can also apply custom mods, additional mod slots, and race customizations to armor you've looted from the battlefield. The same prices apply.
        v-alert(type="info" v-bind:value="true").
          #[strong GM Note]: When awarding Armor, be sure to say the number of mod slots it came with. Only premium quality armor would have
          more than the starting amount in the table above. For really cheap armor, you can remove mod slots completely.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'Armor',
    components: { RuleCard }
  };
</script>
