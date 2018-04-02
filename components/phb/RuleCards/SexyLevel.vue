<template lang="pug">
  rule-card
    span(slot="header") Sexy Level
    template(slot="text")
      p.
        #[abbr(title="What the frack") WTF] is sexy level? ... A joke. But please read this very
        #[a(href="http://www.polygon.com/2017/3/20/14980436/mass-effect-sexiest-character-aliens-ranked" target="_blank") scientific article]
        for more information.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'SexyLevel',
    components: { RuleCard }
  }
</script>
