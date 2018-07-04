<template lang="pug">
  rule-card(id="primers-and-detonators")
    span(slot="header") Primers And Detonators
    template(slot="text")
      p.
        Primers and Detonators add a combo-based mechanic to combat. However, they can also add an unwanted level of complexity
        to combat as well, as tracking which creatures are primed at any given moment can become cumbersome.
        As a variant rule, you may forego this rule and ignore any mention of the Primed condition or detonation effects.
      markdown-file(id="primed" itemType="conditions")
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import MarkdownFile from '~/components/MarkdownFile.vue'

  export default {
    name: 'PrimersAndDetonators',
    components: {
      RuleCard,
      MarkdownFile
    }
  }
</script>
