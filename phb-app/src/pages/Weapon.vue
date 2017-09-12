<template lang="jade">
  v-card
    v-card-title(primary-title)
      div
        weapon-info(:weapon="weapon")
</template>

<script>
  import WeaponInfo from "../components/WeaponInfo.vue";

  export default {
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
      return this.$http
        .get('../data/weapons.json')
        .then(response => response.json())
        .then(response => {
          this.weapon = response.data.find((value) => {
            return value.id == this.$route.params.id;
          });
        });
    }
  };
</script>
