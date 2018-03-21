<template lang="pug">
  span #[strong #[em {{ feature | featureTitle }}].] {{ feature.description | npcName(npc.name) | npcDc(npc) | npcDamage(npc) }}
</template>

<script>
  export default {
    name: 'NpcCommonFeature',
    props: ['feature', 'npc'],
  };
</script>

