<template lang="pug">
  rule-card(id="creatingNewArmor")
    span(slot="header") Creating additional Armor Sets and Armor Mods
    template(slot="text")
      p.headline Creating a Mechanic
      p.
        A Mechanic is a combination of a rule exception/addition, a potency, and a cost per potency level. Below you'll find a list of
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
        increased damage die, and giving advantage on specific rolls. These range from 10,000 to 30,000 credits. These would be vary rare
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
      p.headline Creating additional Armor Mods
      p.
        Creating a custom Armor Mod requires selecting a Slot (head, chest, arms, or legs). Then selecting one or more
        Mechanics and the potency of each Mechanic. Finally, determine the cost by multiplying the potency by cost. For example:
      ul.list
        li Slot = head
        li Mechanic = +2 bonus to ranged and melee attack and damage rolls (potency 4, 2 for ranged + 2 for melee)
        li Cost = 32,000 (8,000 * 4)
      p.headline Creating additional Armor Sets
      p.
        An Armor Set can be one or many pieces of armor. Armor Sets are cheaper than creating custom armor, even though they may
        be more powerful. The justification is that an Armor Set is mass manufactured, so you get more benefits at the expense
        of not being able to customize the armor with additional mods.
      p.
        First find the base cost by deciding which pieces and what type of armor the set will contain. Then use the costs defined in the Creating Armor table.
        Next, decide what Mechanics you want to add to the armor. You do not have to adhere to the max mod slots.
        Calculate to total cost of all your Mechanics and then cut the cost in half. For example:
      ul.list
        li Medium Body Armor = 16,000 (Chest = 10,000, Arms = 3,000, Legs = 3,000)
        li Mechanics = 22,500. Resistance to Slashing, Bludgeoning, & Piercing 15,000 each. 45,000 / 2 = 22,500
        li Total = 38,500 credits.
      v-alert(type="info" v-bind:value="true").
        #[strong GM Note]: When creating Armor Sets, you can fudge the cost is still a rule of thumb. If an Armor Set seems to expense or cheap,
        raise or lower the cost to your needs.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'CreatingNewArmor',
    components: { RuleCard },
    data() {
      return {
        mechanics: []
      };
    },
    created() {
      return this.$http
      .get('../data/armor_mechanics.json')
      .then(response => response.json())
      .then(response => {
        this.mechanics = response.data;
      });
    },
  };
</script>
