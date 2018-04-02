<template lang="pug">
  div
    h2.display-3 Saved Grunts
    v-container(fluid)
      v-layout(row wrap)
        v-flex(v-for="(npc, index) in npcs" v-bind:key="index" xs12 md6 xl4)
          stat-block(v-bind:stats="npc").ma-2
            template(slot="actions")
              v-btn(
              absolute
              dark
              fab
              top
              right
              @click="removeNpc(npc)"
              color="primary"
              ).mr-2
                v-icon delete
</template>

<script>
  import { mapState } from 'vuex';
  import StatBlock from '../components/StatBlock.vue';

  export default {
    components: {StatBlock},
    name: 'Grunts',
    data() {
      return {
        npcs: []
      };
    },
    created() {
      this.npcs = this.$store.state.encounter.npcs.list;
    },
    methods: {
      removeNpc (npc) {
        this.$store.commit('removeEncounterNpc', npc);
      },
    }
  };
</script>
