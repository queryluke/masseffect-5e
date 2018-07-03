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
      p.title Paragon and Renegade rolls
      p.
        A Paragon or Renegade roll is simply a situation in which your GM allows your P/R bonus to apply. For example,
        If you choose to intimidate the target with a threat, the Galaxy Master would ask for an
        Intimidation check. You can ask, "Does my Renegade bonus apply?" In this case, it should. You might choose
        to Persuade the character for information, to which the Paragon bonus would apply. It's your responsibility
        to ask the Galaxy Master about adding the P/R bonus, but the Galaxy Master can proactively ask for a check with the P/R bonus added.
      p.
        When to or when not to apply P/R bonus to a roll is entirely up to the GM. However, the rule of thumb is that the situation
        is meaningful to your character, i.e., would result in a memorable character building event. Punching a common thug may not
        require your Renegade bonus, but punching the host of a fancy gala would.

      p.title Earning P/R points
      p.
        Paragon and Renegade points are earned as you play for actions you take during the campaign. As a rule of thumb, 1 point would be rewarded for a minor
        action, talking back to an officer. Whereas 5 points is a major action, i.e., deciding to save or wipeout research that has potential destructiveness.
      p.
        Your maximum Paragon or Renegade score is 100.
      p.
        For Galaxy Masters, you want to award about 5 points of paragon or renegade player level. I.e., a level 20 character should have
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
    name: 'ParagonAndRenegade',
    components: { RuleCard }
  }
</script>
