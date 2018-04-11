<template lang="pug">
  rule-card
    span(slot="header") Shields
    template(slot="text")
      p.
        Shields are regenerating temporary hit points. When damage is applied it is subtracted from your shield points first,
        then from your hit points. Some abilities "bypass" your shields. In these instances, you subtract damage from your hit
        points leaving your shield points unchanged.
      v-layout
        v-flex.xs12.lg7
          p.headline.mt-2 Shield Regeneration
          p.
            Your shield points regenerate completely on a short or long rest or when combat or an encounter ends. However, in combat,
            you can attempt to regain shield points.
          p.
            A creature that takes the Hide or Dodge action and takes no damage until the start of its next turn regenerates
            shield points equal to the regen rate of their shields. For example, a set of armor with 15 shields and 5 regen
            would regenerate 5 shield points when it takes the Hide or Dodge action and additionally takes no damage for a full round of combat.
        v-flex.xs12.lg5
          v-card
            v-card-text.blue.lighten-5
              p.subheading.
                #[em Why Don't Shields Recharge Automatically in Combat?]
              p.
                Our interpretation is that your armor's shields are managed by the on-board VI, which is taxed during combat
                as it manages other systems: your omni-tool or biotic implant, HUD, etc. Thus, once a threat is properly
                neutralized, or you are able to temporarily remove yourself from the fray, your VI can route power back into your
                shields for immediate regeneration.
      p.headline.mt-2 Shield devices
      p.
        All armor chest pieces come standard with 5 shield points and a regen of 5. However more advanced mods and armor sets
        can provided additional shields. Additionally, personal shield generators are available, which can provide
        shields without the character equipping armor.
      p.headline.mt-2 Lightning Damage
      p.
        All shields are vulnerable to lightning damage. In the event that a lighting attack removes all shield points, the following
        steps outline how to divvy up the damage:
      ol.ml-3
        li Double the damage.
        li Subtract the shield points from the total damage.
        li Reduce the remaining damage by half
        li Apply the new amount to the target's hit points.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'Shields',
    components: {
      RuleCard }
  }
</script>
