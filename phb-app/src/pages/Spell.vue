<template lang="pug">
  v-card
    v-card-title(primary-title)
      div
        spell-info(:spell="spell")
</template>

<script>
  import SpellInfo from "../components/SpellInfo.vue";
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getData'])
    },
    name: 'Spell',
    data() {
      return {
        spell: {}
      };
    },
    created() {
      this.spell = this.getData('spells').find((value) => {
        return value.id == this.$route.params.id;
      });
    },
    components: {
      SpellInfo
    }
  };
</script>
