<template lang="pug">
  rule-card
    span(slot="header") Grenades
    template(slot="text")
      h3.title Armor Capacity: 2
      p.
        All armor comes standard with 2 grenade slots. Some armor and mods allow you to increase this ammount.
      h3.title Resupplying
      p.
        Grenades are a military resource, so, depending on your campaign setting they might be an uncommon or rare item.
        If your character is part of a military outfit, you can resupply every time you return to base (or to your ship).
        Otherwise, finding grenades may be a bit more difficult, requiring you to barter, steal, or loot them.
      p A recommended cost is 500-1000 credits per grenade or mine.
    template(slot="actions")
      v-btn(flat to="/phb/items/grenades" nuxt="true")
        span Grenade List
        v-icon keyboard_arrow_right
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
