<template lang="pug">
  rule-card(id="cover")
    span(slot="header") Cover
    template(slot="text")
      v-card
        v-card-text.blue.lighten-5.elevation-0
          blockquote.mb-3
            em.
              Walls, trees, creatures, and other obstacles can provide cover during combat, making a target more difficult
              to harm. A target can benefit from cover only when an attack or other effect originates on the opposite side of
              the cover.
              There are three degrees of cover. If a target is behind multiple sources of cover, only the most protective degree
              of cover applies; the degrees aren't added together. For example, if a target is behind a creature that gives
              half cover and a tree trunk that gives three-quarters cover, the target has three-quarters cover.
            em
              dl
                dt Half cover
                dd.
                  A target with half cover has a +2 bonus to AC and Dexterity saving throws.A target has half cover if an
                  obstacle blocks at least half of its body. The obstacle might be a low wall, a large piece of furniture, a
                  narrow tree trunk, or a creature, whether that creature is an enemy or a friend.
                dt Three-quarters cover
                dd.
                  A target with three-quarters cover has a +5 bonus to AC and Dexterity saving throws. A target has three-quarters
                  cover if about three-quarters of it is covered by an obstacle. The obstacle might be a portcullis, an arrow
                  slit, or a thick tree trunk.
                dt Full cover
                dd.
                  A target with total cover can't be targeted directly by an attack or a spell, although some spells can reach
                  such a target by including it in an area of effect. A target has total cover if it is completely concealed
                  by an obstacle.
              cite -- #[a(href="https://5thsrd.org/combat/cover/" target="_blank") 5th Edition SRD, (#[em Player's Handbook, pg. 196])]
      p.mt-3.
        Galaxy Masters should take note of the above rule. At minimum, #[strong creatures provide half cover], meaning
        if the trajectory of a player's attack passes through another creature (friendly or enemy), the target has half cover.
        However, you may use any or all of the following varient rules to add variety and clarification to your combat.
      p.subheading Variant: Additional Rules
      dl
        dt Size
        dd.
          Size matters. If the target is one size larger than the creature providing cover, the target has no cover. If
          the target is one size smaller than the creature providing cover, ther target has three-quarters cover.
        dt High Ground
        dd.
          Flying enemies or creatures on high ground are able to shoot over cover.
        dt Friendly Fire
        dd.
          Don't hit your friends! If the creature providing cover is friendly and the attacking creature misses, the attack
          has a 50% chance to hit the friendly target. Roll a die and if the result is odd the attack hits, even the attack
          misses both creatures. Or you can use the friendly creature's AC to decide if the attack hits or misses.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
