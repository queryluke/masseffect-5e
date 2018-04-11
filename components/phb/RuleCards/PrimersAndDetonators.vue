<template lang="pug">
  rule-card
    span(slot="header") Primers And Detonators
    template(slot="text")
      p.
        Primers and Detonators add a combo-based mechanic to combat. However, they can also add an unwanted level of complexity
        to combat as well, as tracking which creatures are primed at any given moment can become cumbersome.
        As a variant rule, you may forego this rule and ignore any mention of the Primed condition or detonation effects.
      p.headline Primers
      p.
        Ability text will indicate the if the ability primes a target and the length of the condition. The text will also
        indicate which type of primer in on the target. It may be one of the following damage types: Force, Necrotic, Fire, Cold, or Lightning.
        The damage type indicates how to resolve the detonation of the primer.
      p.
        Priming effects of different types can stack. I.e., a creature that is lifted (primed force), that is hit with Cryo Beam (primed cold)
        is considered to be primed with both types. Thus, a detonating attack would trigger both effects. These effects occur
        simultaneously (the creature would not be pushed back 2m and then trigger the 4m cold explosion). However, if a creature that is
        both lifted (primed force) and grappled by Lash (primed force) would only suffer the effects of one force explosion.
      p.headline Detonators
      p.
        Abilities (including some thermal clips) may be tagged with 'detonates'. A primed creature hit by
        a detonating ability immediately ends the primed condition, but sets off a detonation effect. The detonation effect
        depends on the type of primer on the target.
      p.headline Detonation Effects
      ul.list
        li #[strong Force]: Target creature takes 1d6 force damage, is knocked back 2m and becomes #[me-text(text="{prone}")].
        li #[strong Necrotic]: Target creature takes 1d10 necrotic damage.
        li.
          #[strong Fire]: Each creature, including the target creature, within a 4m radius must make a Dexterity (DC 10)
          saving throw. On a failed save a creature takes 1d8 fire damage, or half as much damage on a successful one.
        li.
          #[strong Cold]: Each creature, including the target creature, within a 4m radius must make a Strength (DC 10)
          saving throw. On a failed save a creature is #[me-text(text="{frozen}")] until the end of its next turn.
        li.
          #[strong Lightning]: Each creature, including the target creature, within a 4m radius take 1d4 lightning damage.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'
  import MeText from '~/components/shared/MeText.vue'

  export default {
    name: 'PrimersAndDetonators',
    components: {
      RuleCard,
      MeText
    }
  }
</script>
