<template lang="pug">
  rule-card(id="creatingNewArmor")
    span(slot="header") Creating additional Armor Mechanics, Armor Mods, and Armor Sets
    template(slot="text")
      ul.pl-3
        li #[strong Armor mechanics] are the most granular portion of armor. It's the 'thing' that affects the gameplay. A mod or armor set could have one or many mechanics.
        li #[strong Armor mods] are the next step up. They can have multiple mechanics and are installed in a piece of armor.
        li.
          #[strong Armor sets] are complete sets of armor. They contain mechanics that are integrated into the armor, but they #[strong DO NOT] contain any mods. I.e.
          a player cannot salvage a mechanic from an armor set and use it as a mod...well, unless the Galaxy Master allows.
      div.hr
      p.headline Creating a mechanic
      p.
        A 'mechanic' is a combination of a rule exception/addition, a potency, and a cost per potency level. Below you'll find a list of
        Mechanics used in this system.
      p.mb-0 #[strong Rule exception/addition]
      p.
        The first step is deciding what you want your Mechanic to do, e.g. add health, shields, damage, advantage on saving throws, etc.
      p.mb-0 #[strong Potency]
      p.
        Next, decide how the Mechanic's potency will stack. For example, increased shield points have 10 points per potency. So an Armor
        Mod with +30 shield points would have a potency of 3. Armor Mods should never have a potency higher than 5. Keep this in mind
        when figuring out the lowest potency amount.
      p.mb-0 #[strong Cost]
      p.
        Figuring out the cost is mostly guesswork. Low cost mechanics have minor combat applications, such as +1 bonuses,
        additional consumable capacities, or increased hit points, shield points, or AC. These range from 1000 to 10,000 credits.
        In D&D terms, these would be uncommon and rare items. High cost mechanics have major combat applications such as resistances,
        increased damage die, and giving advantage on specific rolls. These range from 10,000 to 30,000 credits. These would be very rare
        or legendary items.
      table.table
        thead
          tr.text-xs-left
            th Rule addition/exception
            th Potency
            th Cost per Potency
        tbody
          tr(v-for="(mechanic, index) in mechanics")
            td {{ mechanic.description }}
            td {{ mechanic.amount }}
            td {{ mechanic.cost }}
      div.hr
      p.headline Creating an armor mod
      p.
        Creating a custom Armor Mod requires selecting a slot (head, chest, arms, or legs). Then selecting one or more
        mechanics and the potency of each Mechanic. Finally, determine the cost by multiplying the potency by cost.
      div.mx-3.pa-2.grey.lighten-2
        p.subheading Example:
        ol.pl-3
          li Slot = head
          li Mechanic = +2 bonus to ranged and melee attack and damage rolls (potency 4, 2 for ranged + 2 for melee)
          li Cost = 32,000 (8,000 * 4)
      div.hr
      p.headline Creating additional Armor Sets
      p.
        An Armor Set can be one or many pieces of armor. Armor Sets are cheaper than creating custom armor, even though they may
        be more powerful. The justification is that an Armor Set is mass manufactured, so you get more benefits at the expense
        of not being able to customize the armor with additional mods.
      p.
        First find the base cost by deciding which pieces and what type of armor the set will contain. Then use the costs defined in the Creating Armor table.
        Next, decide what Mechanics you want to add to the armor. You do not have to adhere to the max mod slots.
        Calculate to total cost of all your Mechanics and then cut the cost in half.
      div.mx-3.pa-2.grey.lighten-2
        p.subheading Example:
        ol.pl-3
          li Medium Body Armor = 16,000 (Chest = 10,000, Arms = 3,000, Legs = 3,000)
          li Mechanics = 22,500. Resistance to Slashing, Bludgeoning, & Piercing 15,000 each. 45,000 / 2 = 22,500
          li Total = 38,500 credits.
      v-alert(type="info" v-bind:value="true").mt-2.
        #[strong Galaxy Master Note]: When creating Armor Sets, the cost is still a rule of thumb. If an Armor Set seems too expensive or cheap,
        raise or lower the cost to your needs.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'CreatingNewArmor',
    components: { RuleCard },
    computed: {
      ...mapGetters(['getData'])
    },
    data () {
      return {
        mechanics: []
      }
    },
    created () {
      this.mechanics = this.getData('armorMechanics')
    }
  }
</script>
