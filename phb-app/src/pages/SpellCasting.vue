<template lang="pug">
  div
    h2.display-3 Spell Casting
    p.
      Biotics, Tech powers and Combat abilities
    rule-card
      span(slot="header") Nomenclature
      template(slot="text")
        p.
          As a general rule, the word "Ability" as the unbrella term for all Biotic spells, Tech powers,
          Combat abilities, and Class features. In addition, the term "Biotic Modifier" or "Tech Modifier" is synonymous
          with "Spellcasting Modifier"
    rule-card
      span(slot="header") Biotic Spells
      template(slot="text")
        p.
          Work almost identically to spells in D&D 5th Edition. Wisdom is your biotic (spellcasting) modifier. You have spell slots
          and regain all of your spell slots after a long rest.
        p.
          The primary difference is that you do not need to prepare spells. Once you have learned a spell, you're considered
          to always have it prepared.
    rule-card
      span(slot="header") Tech Powers
      template(slot="text")
        p.
          Tech points are a casting resource for Engineers, Infiltrators, and Sentinels. You spend these points to fuel various
          tech powers. They represent your Omni-tool's power capacity. When you spend a tech point, it is unavailable until you
          finish a short rest, at the end of which you recharge 1d4 tech points. Some armor mods and class feature increase this
          recharge rate. At the end of a long rest, you recharge all your tech points.
        p.
          Tech powers are unique in that most have a variable tech point cost. You can choose to spend a lot or only a few
          tech points when casting a power, much like you can cast spells using higher level spell slots. However, there
          is a limit on how many tech points you can spent to fuel a tech power. This limit is indicated in the Max TP column
          of your class progression table.
        p.
          Finally, Intelligence is your tech (spellcasting) modifier.
    rule-card
      span(slot="header") Combat Abilities
      template(slot="text")
        p.
          Combat abilities can be learned by Soldiers and Infiltrators, but they rely on equipment rather than biotic amps or a
          beefed-up omni-tool. Instead of a casting cost, Combat abilities recharge on a short or long rest, similar to class features.
    rule-card
      span(slot="header") Spell Saving Throws
      template(slot="text")
        p.
          By default, your character's Spell Save DC is calculated as normal: 8 + proficiency bonus + spellcasting ability modifier. Some
          individual biotic/tech/combat abilities may have a Save DC that is calculated differently. In these cases, the Save DC is
          indicated in the spell/ability description.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'SpellCasting',
    components: { RuleCard }
  };
</script>
