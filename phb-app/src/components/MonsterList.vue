<template lang="pug">
  v-expansion-panel(popout).mb-2
    v-expansion-panel-content(
      v-for="monster in monsters"
      v-bind:monster="monster"
      v-bind:key="monster.id"
      hide-actions)
      div(slot="header")
        v-layout.spell-header
          v-flex.xs9.lg5 #[strong {{ monster.name }}]
          v-flex.hidden-md-and-down.lg5 {{ monster.unit }}
          v-flex.xs3 {{ monster.cr }}
      v-card
        v-card-text.grey.lighten-3
          stat-block(v-bind:stats="monster").mt-2
</template>

<script>
  import StatBlock from "./StatBlock.vue";

  export default {
    components: {
      StatBlock
    },
    name: 'MonsterList',
    props: ['monsters'],
  };
</script>

