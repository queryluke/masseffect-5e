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
        indicate which type of primer is applied to the target. It may be one of the following damage types: Force, Necrotic, Fire, Cold, or Lightning.
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
      dl
        dt Force
        dd The primed target takes 2d6 force damage, is knocked back 6m and becomes #[me-text(text="{prone}")].
        dt Necrotic
        dd.
          The primed target takes 1d12 necrotic damage amd must pass a DC 13 Constituion saving throw or becomes stunned
          until the end of its next turn.
        dt Fire
        dd.
          Each creature within a 4m radius, including the primed target, catch fire, taking 1d6 fire damage. Each creature
          continues to burn for 1 minute, taking 1d6 fire damage at the start of its turn. A creature that is on fire
          can use its action put out the fire.
        dt Cold
        dd.
          Each creature within a 4m radius, including the primed target, must pass a DC 15 Strength saving throw.
          On a failed save a creature is #[me-text(text="{frozen}")] until the end of its next turn.
        dt Lightning
        dd Each creature within a 4m radius, including the primed target, takes 3d4 lightning damage.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import MeText from '~/components/shared/MeText.vue'

  export default {
    name: 'PrimersAndDetonators',
    components: {
      RuleCard,
      MeText
    }
  }
</script>
