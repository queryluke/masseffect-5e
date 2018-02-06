<template lang="pug">
  rule-card
    span(slot="header") Shields
    template(slot="text")
      p.
        Shields are a regenerating health pool. Like your health, it increases with level. When you take damage, if you
        have any shield points, subtract the damage from your shield points first. If there is remaining damage or if
        you do not have any shield points left, then subtract the damage from your hit points. Some abilities "bypass"
        your shields. In these instances, you subtract damage from your hit points leaving your shield points unchanged.
      p.headline.mt-2 Shield Regeneration
      p.
        If you do not lose any shield points from the end of your turn until the start of your turn, roll 1d4 and gain that
        many shield points. Some armor modifications and abilities can allow this to happen every turn. Other mods and
        abilities can increase the die type of your shield regeneration. Your shield regeneration die type cannot be more
        than a d12. Note that taking damage to your hit points does not prevent your shields from recharging.
      p.headline.mt-2 Lightning Damage
      p.
        Shields are vulnerable to lightning damage. In the event that a shield gains resistance to lightning damage,
        it takes normal damage instead of double damage.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Shields',
    components: { RuleCard }
  };
</script>
