<template lang="pug">
  rule-card
    span(slot="header") Buying and Selling
    template(slot="text")
      p.title Buying
      p.
        GM's should feel empowered to raise and lower these costs to suit the needs of your campaign.
        If you player's are part of a military unit, improvements might be free and come at set levels.
        If you're in a desolate setting with limited resources, you might increase the cost of items.
      p.title Selling
      p.
        #[strong Recommendation]: Weapons and Armor can sold at one third of their cost.
      p.
        Additionally, we do not recommend you allow players to sell back their weapons and armor at face value. We've attempted to balance
        the acquisition of credits to avoid players becoming too powerful through mods and new weapons too quickly. Allowing players
        to sell weapons and armor at face value will tip the scales in the player's favor.
      p.title Discounts
      p.
        Long time Mass Effect players will certainly want to reference Shepard's ability to secure discounts from local shops. One option
        is to have players make Intimidation or Persuasion checks (with or without Paragon/Renegade scores). However, for
        added variety and randomness, you can use the following set of rules.
      p.
        First, assign a DC to your shopkeeper. The DC could be equal for Intimidation and Persuasion, or it could be different for each.
      p.mb-0.
        Next, have you player make an Intimidation or Persuasion check. If using Paragon/Renegade rule, they can add their Renegade modifier to
        Intimidation checks or Paragon modifier for Persuasion checks. The result of this check adds a modifier to the final d100 roll (see next step).
      ul.list.mb-3
        li #[strong Critical Failure]: -50
        li #[strong Failure]: -20
        li #[strong Success]: +20
        li #[strong Critical Success]: +50
      p.
        Finally, the GM or player rolls a d100 adding the modifier from the previous step. Consult the following table for the resolution.
      table.table
        thead
          tr
            th Roll
            th Result
        tbody
          tr
            td <= 10
            td The shopkeeper is furious that you would attempt to cheat them out of their wares. They will not do business with your or your party.
          tr
            td 11-30
            td The shopkeeper sees through your ruse. If you're going to play it that way, you'll have to pay 10% more.
          tr
            td 31-50
            td The shopkeeper is unmoved. They aren't going to give you a discount, but they're not shutting their doors either.
          tr
            td 51-70
            td The shopkeeper has seen these ploys before, but you gave him a good chuckle, for that, you get a 10% discount.
          tr
            td 71-90
            td Better to work with you than against you, the shopkeeper offers you a 20% discount.
          tr
            td >= 91
            td Either completely enthralled with your proposal, or scared out of their wits, the shopkeeper offers you a on-time discount of 50% off, and a lifetime discount of 20% off.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
