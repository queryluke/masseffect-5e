<template lang="pug">
  rule-card
    span(slot="header") Paragon & Renegade
    template(slot="text")
      p.
        These are special proficiency bonuses that can be applied to certain skill checks. For example, you might try to
        get information out of another character. If you choose to intimidate the target with a threat, the Galaxy Master would ask for an
        Intimidation check. You can ask, "Does my Renegade bonus apply?" In this case, it should. You might choose
        to Persuade the character for information, to which the Paragon bonus would apply. It's your responsibility
        to ask the Galaxy Master about adding the P/R bonus, but the Galaxy Master can proactively ask for a check with the P/R bonus added.
      p.
        Paragon and Renegade is earned as you play. It can be awarded by the Galaxy Master based on actions you take during the campaign.
        It's a permanent bonus. You get a +1 bonus for every 10 Paragon and Renegade points. Your maximum score in either is 100.
      p.
        For Galaxy Masters, you want to award about 5 points per level of paragon or renegade. I.e., a level 20 character should have
        about 100 points if they added their P/R scores together. As a rule of thumb, 1 point would be rewarded for a minor
        action, talking back to an officer for Renegade. Whereas 5 points is a major action, i.e., deciding to save or
        wipeout research that has potential destructiveness.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'ParagonAndRenegade',
    components: { RuleCard }
  }
</script>
