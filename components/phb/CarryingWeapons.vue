<template lang="pug">
  rule-card(id="carrying-weapons")
    span(slot="header") Carrying Weapons
    template(slot="text")
      p.
        You can carry 2 weapons into combat unless a feature or armor mod allows you to carry more. If using the
        #[nuxt-link(to="/phb/rules/general#encumbrance") Variant: Encumbrance rule], you can carry as many weapons as
        your carry capacity will allow.
      p.body-2 Holstering and Drawing
      p.
        You can holster the weapon you're wielding and draw a weapon you're carrying as a bonus action. This is true for
        all weapon types.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    name: 'HolsteringAndDrawing',
    components: { RuleCard }
  }
</script>
