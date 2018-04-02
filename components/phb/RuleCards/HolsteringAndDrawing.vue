<template lang="pug">
  rule-card
    span(slot="header") Holstering & Drawing Weapons
    template(slot="text")
      p.
        As long as you have a weapon equipped (somewhere on your person), you can holster the weapon you're currently
        weilding and draw an equipped weapon as a bonus action. This is true for all weapon types.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    name: 'HolsteringAndDrawing',
    components: { RuleCard }
  }
</script>
