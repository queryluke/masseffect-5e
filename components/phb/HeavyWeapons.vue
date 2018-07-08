<template lang="pug">
  rule-card(id="heavy-weapons")
    span(slot="header") Heavy Weapons
    template(slot="text")
      p.title.mt-2 Charges
      p.
        As stated above, Heavy Weapons use Charges instead of Thermal Clips. If you run out of Charges your weapon is nothing
        more than a hunk of metal.
      p.title.mt-2 Targeting
      p.
        Most Heavy Weapons also use the Targeting condition. Targeting means painting the battlefield, or keeping a lock on one or more creatures for
        a single round of combat. Targeting is considered a free action, as long as you've already drawn the heavy weapon,
        i.e., you can choose to pick-up or equip a weapon as your action, then begin targeting as a free action before your turn ends.
        If you're already holding the weapon, you might use an ability as your action and then begin targeting.
      p.subheading Targeting condition
      markdown-file(id="targeting" itemType="conditions")
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'
  import MarkdownFile from '~/components/MarkdownFile.vue'

  export default {
    components: { RuleCard, MarkdownFile }
  }
</script>
