<template lang="pug">
  div
    spell-card(v-for="spell in spells" v-bind:spell="spell" v-bind:key="spell.id")
</template>

<script>
  import SpellCard from '../components/SpellCard.vue';
  import {mapGetters} from 'vuex';

  export default {
    created() {
      this.spells = this.getData('spells');
      if (this.limit) {
        this.spells = this.spells.filter(spell => spell[this.limit]);
      }
    },
    components: {
      SpellCard
    },
    computed: {
      ...mapGetters(['getData']),
    },
    data() {
      return {
        spells: []
      }
    },
    name: 'PrintSpellCards',
    props: ['limit']
  };
</script>

