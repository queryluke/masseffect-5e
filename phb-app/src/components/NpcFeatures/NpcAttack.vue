<template lang="pug">
  div
    p.mb-0 #[strong #[em {{ feature.name }}].] #[em {{ feature.attackType }} Weapon Attack]: {{ feature.description.attack | npcName(npc.name) | npcDc(npc) }}
    p(:class="[feature.description.miss ? 'my-0' : 'mt-0']") #[em Hit]: {{ feature.description.hit | npcName(npc.name) | npcDc(npc) | npcDamage(npc) }}
    p(v-if="feature.description.miss").mt-0 #[em Miss]: {{ feature.description.miss | npcName(npc.name) | npcDc(npc) }}
</template>

<script>
  export default {
    name: 'NpcAttack',
    props: ['feature', 'npc'],
  };
</script>

