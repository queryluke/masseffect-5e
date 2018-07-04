<template lang="pug">
  rule-card(id="armor-customization")
    span(slot="header") Armor can be customized & created
    template(slot="text")
      p.
        Armor Customization is a new feature and provides a lot of the options that would be handled by Magical Items in traditional 5e.
        It costs a pretty penny, so creating armor might not be available to new characters, but as they progress, you should be able
        to afford custom jobs.
      p.headline Creating Armor from Scratch
      p.
        When you create a piece of armor from scratch, you need to select:
      ol.pl-3
        li The armor placement (Head, Chest, Arms, Legs).
        li The armor type (Light, Medium, Heavy)
        li Additional mod slots, if any.
      table.table.alt-table
        thead.text-xs-left
          tr
            th Slot / Type
            th Light
            th Medium
            th Heavy
            th Mod Slots #[em (max)]
        tbody
          tr
            td #[strong Chest]
            td 8,000
            td 10,000
            td 12,000
            td 2 #[em (3)]
          tr
            td #[strong Arms & Legs]
            td 2,000
            td 3,000
            td 4,000
            td 1 #[em (3)]
          tr
            td #[strong Head]
            td(colspan=3) 5,000
            td 0 #[em (2)]
      ul.list
        li #[strong Additional Mod Slots:] 20,000 credits
      p
        v-btn(to="/phb/armor/mods") Mod List
      div.hr
      p.headline Example
      p Medium Head Armor w/ 2 mod slots
      table.table.alt-table
        tbody
          tr
            td Medium Head
            td 4000
          tr
            td Additional Mod Slot (starts with 1)
            td 20000
          tr
            td #[strong Total]
            td #[strong 24000 credits]
      v-alert(type="info" v-bind:value="true").
        #[strong Galaxy Master Note]: You can increase or decrease armor costs based on location and the player's race. For example, a Krogan trying to buy armor on
        the Asari homeworld, Thessia, might have to pay extra to have the armor fitted for their race.
      p.headline.mt-3 Looted armor
      p.
        You can sometimes apply custom mods and additional mod slots to armor you've looted from the battlefield. The same prices apply.
        If the awarded armor is a manufactured Armor Set, it cannot be customized.
      v-alert(type="info" v-bind:value="true").
        #[strong Galaxy Master Note]: When awarding Armor, be sure to say the number of mod slots it came with or if it cannot be customized (i.e., an Armor Set).
        Only premium quality armor would have more than the starting amount in the table above. For really cheap armor, you can remove mod slots completely.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
