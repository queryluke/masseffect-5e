<template lang="pug">
  rule-card(id="armorCustomization")
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
        You can sometimes apply custom mods, additional mod slots, and race customizations to armor you've looted from the battlefield. The same prices apply.
        If the awarded armor is a manufactured Armor Set, it cannot be customized.
      v-alert(type="info" v-bind:value="true").
        #[strong GM Note]: When awarding Armor, be sure to say the number of mod slots it came with or if it cannot be customized (i.e., an Armor Set).
        Only premium quality armor would have more than the starting amount in the table above. For really cheap armor, you can remove mod slots completely.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'ArmorCustomization',
    components: { RuleCard },
  };
</script>
