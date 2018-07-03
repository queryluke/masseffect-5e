<template lang="pug">
  rule-card
    span(slot="header") Heavy Weapons
    template(slot="text")
      p.title.mt-2 Charges
      p.
        As stated above, Heavy Weapons use Charges instead of Thermal Clips. If you run out of Charges your weapon is nothing
        more than a hunk of metal.
      p.title.mt-2 Targeting
      p.
        Most Heavy Weapons also use the Targeting condition. Targeting means painting the battlefield, or keeping a lock on one or more creatures for
        a single round of combat. Targeting is considered a free action, as long as you've already drawn the heavy weapon,
        i.e., you can choose to pick-up or equip a weapon as your action, then begin targeting as a free action before your turn ends.
        If you're already holding the weapon, you might use an ability as your action and then begin targeting.
      p.
        #[strong Condition Details:] While targeting, your speed is reduced by half and you automatically fail Dexterity
        saving throws. Creatures that attack you have advantage.
      p.mb-0.
        #[strong Targeting Failures:]
        If targeting ends before the start of your next turn, it fails and the weapon does not fire or use a weapon charge.
        It can be prematurely ended for the following reasons:
      ul.ml-5
        li As a reaction: You can choose to end your Targeting condition as a reaction to an attack (not to a damage roll).
        li Taking cover: Taking full or three-quarter cover while targeting ends the condition.
        li Another condition: If you lose your footing by being knocked prone, becoming lifted, or incapacitated, targeting ends.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    name: 'HeavyWeapons',
    components: { RuleCard }
  }
</script>
