<template lang="pug">
  v-card
    v-card-title(primary-title)
      div
        weapon-info(:weapon="weapon")
</template>

<script>
  import WeaponInfo from "../components/WeaponInfo.vue";
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getData'])
    },
    name: 'Weapon',
    components: {
      WeaponInfo
    },
    data() {
      return {
        weapon: {}
      };
    },
    created() {
      this.weapon = this.getData('weapons').find((value) => {
        return value.id == this.$route.params.id;
      });
    }
  };
</script>
