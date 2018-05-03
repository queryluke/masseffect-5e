<template lang="pug">
  v-container
    h2.display-3 Creating Armor
    p.
      Though we provide a list of armor mods an sets, we encourage you to create your own!
    rule-card
      span(slot="header") Nomenclature
      template(slot="text")
        dl
          dt Mechanic
          dd The 'thing' that affects the gameplay. A mod or armor set could have one or many mechanics.
          dt Mod
          dd An item containing 1 more mechanics that can be installed when creating custom armor.
          dt Set
          dd.
            One or more pieces of armor that must be worn together and provide mechanics when worn. Mechanics contained within sets
            are meant to be integrated, and not salvageable from the armor. In addition, armor sets are not intended to be upgrade
            with other mods.
    rule-card
      span(slot="header") Creating a mechanic
      template(slot="text")
        p.
          A 'mechanic' is a combination of a rule exception/addition, a potency, and a cost per potency level. Below you'll find a list of
          Mechanics used in this system.
        p.title Rule exception/addition
        p.
          The first step is deciding what you want your Mechanic to do, e.g. add health, shields, damage, advantage on saving throws, etc.
        v-alert(type="info" value="true").mb-4.
          We strongly recommend that you do not make new mechanics that increase the combat effectiveness of ranged weapons.
          These mechanics should be reserved for weapon mods.
        p.title Potency
        p.
          Next, decide how the Mechanic's potency will stack. For example, increased shield points have 5 points per potency. So, an Armor
          Mod with +10 shield points would have a potency of 2. Armor Mods should never have a potency higher than 3. Keep this in mind
          when figuring out the lowest potency amount.
        p.title Cost
        p.
          Figuring out the cost is mostly guesswork. Low cost mechanics have minor combat applications, such as
          additional carrying capacity or minor speed boosts. These range from 1000 to 5,000 credits.
          Mods that increase survivability (shields, AC, resistances) or damage should range between 5,000 and 20,000 credits
        p.title Current Mechanic List
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
    rule-card
      span(slot="header") Creating an armor mod
      template(slot="text")
        p.
          Creating a custom Armor Mod simply requires combining a slot (head, chest, arms, or legs) and one or more mechanics and a potency for
          each mechanic. Determine the cost of the mod by adding each mechanic cost (cost * potentcy)
        div.mx-3.pa-2.grey.lighten-2
          p.subheading Example: +10 shields, +1 AC
          ol.pl-3
            li Slot = Chest
            li Mechanic 1 = +10 sheilds (2 potency * 10,000 credits) = 20,000 credtis
            li Mechanic 2 = +1 AC (1 potency * 8,000 credits) = 8,000 credits
            li Mod Cost = 28,000 credits
        v-alert(type="info" value="true").mt-4.
          When creating new mods, be mindful that their benefits can stack. I.e., you wouldn't want to create a +3 AC armor mod for the head, chest, arms, and legs.
          This would result in a player being able to attain +12 AC.
    rule-card
      span(slot="header") Creating Armor Sets
      template(slot="text")
        p.
          An Armor Set can be one or many pieces of armor. Armor Sets are cheaper than creating custom armor, even though they may
          be more powerful. The justification is that an Armor Set is mass manufactured, so you get more benefits at the expense
          of not being able to customize the armor with additional mods.
        p.
          First decide the type of armor (light, medium, heavy) and which pieces it will contain.
          Then find the base cost by using the costs defined in the #[a(v-on:click="showGlobalDialog('armor-customization')") creating armor table].
          Next, decide what Mechanics (and potency) you want to add to the armor. Calculate to total cost of all your Mechanics, add it to the base cost
          of your armor, then reduce the amount by 15%.
        div.mx-3.pa-2.grey.lighten-2
          p.subheading Example:
          ol.pl-3
            li Medium Body Armor = 16,000 (Chest = 10,000, Arms = 3,000, Legs = 3,000)
            li Mechanics = Resistance to Slashing, Bludgeoning, & Piercing (15,000 for slashing, 15,000 for bludgeoning, 30,000 for piercing)
            li Subtotal = 76,000
            li Total = 64,600 credits = 76,000 -  (76,000 * .15)
        v-alert(type="info" v-bind:value="true").mt-4.
          When creating Armor Sets, the cost is still a rule of thumb. If an Armor Set seems too expensive or cheap, raise or lower the cost to your needs.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: { RuleCard },
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.mechanics = this.getData('armorMechanics')
    },
    data () {
      return {
        mechanics: []
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | For GMs - Customizing Armor',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn how to create new armor sets and mods' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['showGlobalDialog'])
    }
  }
</script>
