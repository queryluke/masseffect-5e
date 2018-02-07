<template lang="pug">
  rule-card
    span(slot="header") Grenades
    template(slot="text")
      p.headline Capacity: 2
      p.
        All armor comes standard with 2 grenade slots. Some armor and mods allow you to increase this ammount.
      p.headline Resupply: Rare
      p.
        Grenades are a military resource, so, depending on your campaign setting they might be an uncommon or rare item.
        If your character is part of a military outfit, you can resupply every time you return to base (or to your ship).
        Otherwise, finding grenades may be a bit more difficult, requiring you to barter, steal, or loot them.
      v-btn(to="/grenades").mt-3 Grenade List
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'Grenades',
    components: { RuleCard },
  };
</script>
