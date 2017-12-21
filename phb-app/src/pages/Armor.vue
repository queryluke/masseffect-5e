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
      span(slot="header") Armor isn't ALL IN ONE
      template(slot="text")
        p.
          In ME5e there are 4 armor placements, Head, Chest, Arms, Legsand you can mix and match armor types (Light, Medium, Heavy).
          This makes the array of AC possibilities a bit more complex. Remember, you must be proficient in an armor piece's type to wear it.
        p.headline AC Breakdown
        table.table
          thead.text-xs-left
            tr
              th Armor Type Mix
              th AC
          tbody
            tr
              td Empty armor slot
              td -1 AC
            tr
              td All Light
              td 11 + Dexterity Modifier
            tr
              td Medium & Light
              td 12 + Dexterity Modifier (max 2)
            tr
              td All Medium
              td 13 + Dexterity Modifier (max 2)
            tr
              td A least 1 Heavy, Mix of Medium & Light
              td 14
            tr
              td 1 Heavy, All other Medium
              td 15
            tr
              td 2 Heavy & 2 Medium
              td 16
            tr
              td 3 Heavy & 1 Medium
              td 17
            tr
              td All Heavy
              td 18
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
              td Light Armor
              td 3,000
              td 8,000
              td 2,000
              td All races except, Geth, Krogan, and Turians
            tr
              td Medium Armor
              td 4,000
              td 10,000
              td 3,000
              td Asari, Batarian, Human, Quarian, Turian, Volus
            tr
              td Heavy Armor
              td 5,000
              td 12,000
              td 4,000
              td Batarian, Human, Krogan, Turian
            tr
              td Mod Slots (Max)
              td 1 (max 3)
              td 2 (max 3)
              td 0 (max 2)
        ul.list
          li #[strong Additional Mod Slots:] 20,000 credits
          li #[strong Race Custom Fitting:] 5,000 credits
        p
          v-btn(to="/armor/mods") Mod List
        div.hr
        p.headline Example
        ol.list
          li.
            You want a Medium-Type, Head Armor for your Drell. On the table, the base cose for Medium + Head is 4,000 credits.
          li.
            But this is for a Drell which is not a standard race for medium armor. So it will cost an additional 5,000 credits to get
            this customized.
          li.
            You want to add 2 mods to the helmet, but a Head piece only starts with one mod slot. It will cost another 20,000 credits to upgrade
            the helmet.
          li.
            Finally, you can add your mods (link above). You select the Umbra AI (8,000) and the Voice
            Modulator (2,000).
          li.
            So the grand total for your custom head piece is: 39,000 credits.
        p.headline.mt-3 Customizing Armor
        p.
          Instead, you might find it cheaper to take what you can get from the battlefield and customize it. If the in this example Drell got
          a Medium Head piece off the battlefield with 2 mod slots, he could spend 15,000 credits to add the 2 mods and customize it
          for his race.
        p
          strong GM Note:
          span.
            When awarding Armor, be sure to say the number of mod slots it came with. Only premium quality armor would have
            more that the starting amount in the table above. For really cheap armor, you can remove mod slots.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'Armor',
    components: { RuleCard }
  };
</script>
