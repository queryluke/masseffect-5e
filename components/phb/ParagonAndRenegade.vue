<template lang="pug">
  rule-card(id="paragon-and-renegade")
    span(slot="header") Variant: Paragon & Renegade
    template(slot="text")
      p.
        The Variant: Paragon & Renegade (P/R) rule adds another layer of complexity to skill checks.
      p.title Paragon and Renegade points
      p.
        Your Paragon and Renegade points can add a bonus to skill checks. You gain a +1 bonus to your skill check for every
        10 Paragon or Renegade points you have. For example, if you had 14 Paragon points and 22 Renegade points, you would
        add +1 to any paragon rolls and +2 to any renegade rolls.
      p.
        You can gain points in Paragon and Renegade, but your total combined points can never be more than 100.
      p.title Paragon and Renegade rolls
      p.
        A Paragon or Renegade roll is any skill check in which your GM allows your P/R bonus to augment the outcome of the roll.
        It's the player's responsibility to ask the Galaxy Master about adding the P/R bonus, but the Galaxy Master can
        proactively ask for a check with the P/R bonus added.
      p.
        When to or when not to apply P/R bonus to a roll is entirely up to the GM. However, the rule of thumb is that the
        action taken is more Paragon-like or more Renegade-like than what an average sentient being would do.
      p.body-2 Paragon examples:
      ul.mb-3
        li Acrobatics: jump in front of a bullet to protect someone
        li Athletics: Hold fast a door why your party escapes a threat
        li Intimidation: Threaten someone with justice
        li Medicine: Stabalize an enemy
        li Vehicle Handling: Lead your chasers right to the authorities
      p.body-2 Renegade example:
      ul.mb-3
        li Athletics: Hold fast a door so the threat burns inside
        li Deception: Convince the bounty hunters their target fled into that cave (which happens to be booby-trapped)
        li Electronics: Broadcast the controversial research to the galaxy, let the politicians and scientists figure it out
        li Intimidation: Threaten someone with pain
        li Vehicle Handling: Lead your chasers right into a reinforced-steel wall
      p.title Earning P/R points
      p.
        In general, whenever you succeed on a P/R roll, you should gain one point for the trait you used as your bonus.
        Depending on the magnitude of the action, the GM can award additional points, but no more than 5. GMs can also
        reward P/R points for non skill checks based on a player's roleplaying choices.
      p.
        For Galaxy Masters, you want to award about 5 points of paragon or renegade per player level. I.e., a level 20 character should have
        about 100 points if they added their P/R scores together.
      p.title P/R and Alignment
      p.
        Paragon and Renegade aren't necessarily correlated with alignment. Paragon doesn't mean 'good' or 'lawful' just
        as Renegade doesn't mean 'evil' or 'chaotic'. However, characters who a chaotic evil would #[em tend] towards
        renegade and vice versa.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
