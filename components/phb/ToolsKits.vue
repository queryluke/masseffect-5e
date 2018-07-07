<template lang="pug">
  rule-card(id="tools-kits")
    span(slot="header") Tools & Kits
    template(slot="text")
      p.title Tool Proficiencies
      p.
        Mass Effect 5e utilizes the Tool Proficiency rules found in
        #[a(href="http://dnd.wizards.com/products/tabletop-games/rpg-products/xanathars-guide-everything" target="_blank") Xanathar's Guide to Everything]
        (pg. 78). In summary, it's unclear when a player should use a tool proficiency and a skill proficiency. The rule
        of thumb is that tools have specific applications whereas skills are very broad, but this limits the use of tools.
      p.
        Thus, to make tool proficiencies more attractive, Xanathar's Guide to Everything added benefits to combining tools
        with skills. The first is that combining a tool with a skill gives the player advantage when making the skill check.
        The second benefit is that tools provide additional non-combat features.
    template(slot="actions")
      v-btn(flat to="/phb/items/tools-kits" nuxt=true)
        span Tool & Kit List
        v-icon keyboard_arrow_right


</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
