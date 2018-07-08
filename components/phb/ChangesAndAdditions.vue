<template lang="pug">
  flat-card(alert-box id="changes-and-editions")
    span(slot="title") Changes and additions
    template(slot="body")
      p.
        Once you have a general understanding of the 5th Edition rules, you'll want to look at our rule changes:
      dl
        dt #[nuxt-link(to="/phb/rules/general") General]
        dd.
          This section gives you an overview of the general rule changes. You might consider this the "miscellaneous" category.
        dt #[nuxt-link(to="/phb/rules/combat") Combat]
        dd.
          This section gives you an overview of the changes in combat, which are mostly additions.
          It contains information about #[strong Shields], #[strong Primers and Detonators], and #[strong Barriers].
        dt #[nuxt-link(to="/phb/rules/spellcasting") Spellcasting]
        dd.
          A major feature of D&D are the spells. Since there isn't 'magic' in Mass Effect, our spell list is converted into
          #[strong biotics], #[strong tech powers], and #[strong combat devices]. The spellcasting rules will explain how these three types of
          'spells' are utilized in the system.
        dt #[nuxt-link(to="/phb/rules/weapons") Weapons]
        dd.
          A huge addition is the massive increase in ranged weapons, specifically firearms. The addition of the Mass Effect arsenal
          required some adjustments to combat and how attacks with ranged weapons are made. There are still melee weapons available,
          and some subclasses excel at melee combat. However, in the world of Mass Effect, ranged weapons are the default choice for combatants.
        dt #[nuxt-link(to="/phb/rules/armor") Armor]
        dd.
          The other major addition is the expansion of how armor works. Instead of a full suit of armor, ME5e allows players to don armor of
          different types on different parts of the body, resulting in an array of Armor Class (AC) possibilities. The other change is that armor can be
          modified to increase its stats and grant additional features.
        dt #[nuxt-link(to="/phb/rules/expenses") Expenses]
        dd.
          In this section we'll outline currency, buying and selling items, and provide some guidelines for setting the cost of items and lifestyle expenses.
        dt #[nuxt-link(to="/phb/rules/skills") Skills]
        dd.
          We've replaced some 5th Edition skills with sci-fi flavored versions.
        dt #[nuxt-link(to="/phb/rules/conditions") Conditions]
        dd.
          We've added a few conditions to accommodate certain spells and weapon types.
    span(slot="alertTitle") Variant Rules
    template(slot="alertBody")
      p.
        Occasionally, you'll see a rule preceded by the word "Variant". This means the rule is optional. In some cases,
        it may replace an existing rule. For example, the Variant: Encumbrance rule replaces the standard Lifting & Carrying rules.
      p.
        In other instances, the rule may be completely ignored. For example, the Paragon & Renegade system adds rules for utilizing
        paragon and renegade points. While this adds a nice touch of flavor from the original #[em Mass Effect] trilogy, it is not required
        for this system to work, and it can safely be left out of your campaign if desired.
</template>

<script>
  import FlatCard from '~/components/cards/FlatCard.vue'

  export default {
    components: { FlatCard }
  }
</script>
