<template lang="pug">
  div
    p.
      Though we provide a list of armor mods and sets, we encourage you to create your own!
    rule-card
      span(slot="header") Nomenclature
      template(slot="text")
        dl
          dt Mechanic
          dd The aspect that affects the gameplay. A mod or armor set can have one or more mechanics.
          dt Mod
          dd An item, containing one or more mechanics, that can be installed when creating custom armor.
          dt Set
          dd.
            One or more pieces of armor that must be worn together and provide mechanics when worn. Mechanics contained within sets
            are meant to be integrated, and not salvageable from the armor. In addition, armor sets are not intended to be upgraded
            with other mods.
    rule-card
      span(slot="header") Creating a Mechanic
      template(slot="text")
        p.
          A 'mechanic' is a combination of a rule exception/addition, a potency, and a cost per potency level. Below you'll find a list of
          mechanics used in this system.
        p.title Rule exception/addition
        p.
          The first step is deciding what you want your mechanic to do, e.g. add health, shields, or damage; provide advantage on saving throws, etc.
        v-alert(type="info" value="true").mb-4.
          We strongly recommend that you do not make new mechanics that increase the combat effectiveness of ranged weapons.
          These mechanics should be reserved for #[em weapon] mods.
        p.title Potency
        p.
          Next, decide how the mechanic's potency will stack. For example, increased shield points have 5 points per potency. So, an Armor
          Mod with +10 shield points would have a potency of 2. Armor Mods should never have a potency higher than 3. Keep this in mind
          when figuring out the lowest potency amount.
        p.title Cost
        p.
          Figuring out the cost is mostly guesswork. Low-cost mechanics have minor combat applications, such as
          additional carrying capacity or minor speed boosts. These range from 1,000 to 5,000 credits.
          Mods that increase survivability (shields, AC, resistances) or damage should range between 5,000 and 20,000 credits
        p.title Current Mechanic List
        table.table
          thead
            tr.text-xs-left
              th Rule addition/exception
              th Potency
              th Cost
          tbody
            tr(v-for="(mechanic, index) in mechanics")
              td(data-table-key="Rule") {{ mechanic.description }}
              td(data-table-key="Potency") {{ mechanic.amount }}
              td(data-table-key="Cost") {{ mechanic.cost }}
    rule-card
      span(slot="header") Creating an Armor Mod
      template(slot="text")
        p.
          Creating a custom armor mod simply requires combining a slot (head, chest, arms, or legs), one or more mechanics, and a potency for
          each mechanic. Each potency is 2.5 times more expensive than it's previous level. If you have a potency of 1, the final cost equals the value
          in the Cost column. If you have a potency of 2, the final cost equals the value in the Cost column times 2.5. If you
          have a potency of 3, the final cost equals the value in the Cost column times 5.
        div.mx-3.pa-2.grey.lighten-2
          p.subheading Example: +10 shields, +1 AC
          ol.pl-3
            li Slot = Chest
            li Mechanic 1 = +10 sheilds (potency 2)
            li Cost 1 = 10,000 * 2.5 = 25,000
            li Mechanic 2 = +5 sheild regen (potency 1)
            li Cost 2 = 8,000
            li Mechanic 2 = +3 AC (potency 3)
            li Cost 2 = 20,000 * 5 = 100,000
            li Mod Cost = 133,000
        v-alert(type="info" value="true").mt-4.
          When creating new mods, be mindful that their benefits can stack. You wouldn't want to create a +3 AC armor mod
          for the head, chest, arms, and legs &mdash; this would result in a player being able to attain +12 AC.
    rule-card
      span(slot="header") Creating Armor Sets
      template(slot="text")
        p.
          An armor set can be one or many pieces of armor. Armor sets are cheaper than creating custom armor, even though they may
          be more powerful. The justification is that an armor set is mass manufactured, so you get more benefits at the expense
          of not being able to customize the armor with additional mods.
        p.
          First, decide the type of armor (light, medium, or heavy) and which pieces it will contain.
          Then find the base cost by using the costs defined in the #[a(v-on:click="showGlobalDialog('armor-customization')") creating armor table].
          Next, decide what mechanics (and their potency) you want to add to the armor. Calculate the total cost of all your mechanics, add it to the base cost of your armor piece.
        p.
          Next, you can decide if there are benefits for wearing multiple pieces of the armor. Benefits can be mechanics (with a potency)
          or a unique mechanic. Calculate the total of the of all set bonuses and distribute that total evenly across the armor pieces.
        p.
          Finally, with all costs calculated, reduce the total amount of each armor piece by 15%.
        div.mx-3.pa-2.grey.lighten-2
          p.subheading Example:
          ol.pl-3.mt-2
            li Set Piece 1 = Medium Body Armor = 16,000 (Chest = 10,000, Arms = 3,000, Legs = 3,000)
            li Set Piece 1 Mechanics = AC +2 (as a mod, this costs 50,000)
            li Set Piece 1 Subtotal = 66,000
          ol.pl-3.mt-2
            li Set Piece 2 = Medium Head = 5,000
            li Set Piece 2 Mechanics = Darkvision, toggled as a #[em free] action (as a mod, 3,000, slight increase for free action)
            li Set Piece 2 Subtotal = 8,000
          ol.pl-3.mt-2
            li Set Bonus (2 of 2): +10 Shields (as a mod, 25,000)
            li Divide set bonus by number of pieces: 12,500
            li Set Piece 1 Total = 12,500 + 66,000 - ((12,500 + 66,000) * 0.15) = 66,725
            li Set Piece 1 Total = 12,500 + 8,000 - ((12,500 + 8,000) * 0.15) = 17,425
        v-alert(type="info" v-bind:value="true").mt-4.
          When creating armor sets, the cost is just a rule of thumb. If an armor set seems too expensive or cheap, raise or lower the cost to your needs.
</template>

<script>
import RuleCard from '~/components/cards/AltRuleCard.vue'
import mechanics from '~/static/data/armor_mechanics'

export default {
  components: { RuleCard },
  data () {
    return {
      mechanics
    }
  }

}
</script>
