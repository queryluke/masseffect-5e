<template lang="pug">
  rule-card(id="race-class-restrictions")
    span(slot="header") Race/Class Restrictions
    template(slot="text")
      p.
        In Mass Effect 5e, we restrict a race's class options. The primary reason is that biotic abilities available to
        Adepts, Vanguards, and Sentinels are either rare or non-existent in certain races. Instead of making our own distinctions
        about what races can play what classes, we used the race/class combinations available in the Mass Effect 3 and Mass Effect: Andromeda
        multiplayer system. Feel free to review the Race/Class combinations in the links below:
      ul.list
        li #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_3_Multiplayer/Character_Customization" target="_blank") Mass Effect 3 Multiplayer]
        li #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect:_Andromeda_Multiplayer#Character_Customization" target="_blank") Mass Effect: Andromeda Multiplayer]
      p.title.mt-3 Recommendation, not Law
      p.
        However, our restrictions should be considered a rule of thumb and are #[em not] based on game balance. Therefore,
        we encourage players and Galaxy Masters to talk about other race/class combinations and make their own decisions.
      p.
        If the decision concerns whether or not a race can play as a biotic-capable class, we recommend reading the
        #[a(href="http://masseffect.wikia.com/wiki/Biotics" target="_blank") Mass Effect Wiki's page about biotics].
        Specifically, the sections titled "Alien Biotics" and "Biotics in Andromeda." If the decision is based on
        a different combination, we cannot offer any other insight other that using your own judgement.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
