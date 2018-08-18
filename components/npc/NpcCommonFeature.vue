<template lang="pug">
  span(v-if="feature.id") #[strong #[em {{ feature | featureTitle | removeActionId }}].] {{ feature.description | npcName(npc.name) | npcDc(npc) | npcDamage(npc) | npcBarrier(npc)}}
</template>

<script>
  export default {
    props: ['feature', 'npc']
  }
</script>

