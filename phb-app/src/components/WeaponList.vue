<template lang="pug">
  v-expansion-panel(popout).mb-2
    v-expansion-panel-content(
      v-for="weapon in weapons"
      v-bind:key="weapon.id"
      hide-actions)
      div(slot="header")
        v-layout.spell-header
          v-flex.xs4.sm3.lg1
            weapon-type(:weapon="weapon")
          v-flex.xs8.sm9.lg3
            strong {{ weapon.name }}
          v-flex.hidden-md-and-down.lg1 {{ weapon.rof }}
          v-flex.hidden-md-and-down.lg1 d{{ weapon.damage }}
          v-flex.hidden-md-and-down.lg2 {{ weapon.heat }}
          v-flex.hidden-md-and-down.lg2 {{ weapon.range }}
          v-flex.hidden-md-and-down.lg2 {{ weapon.weight }}
      v-card
        v-card-text.grey.lighten-3
          weapon-info(:weapon="weapon").mt-2
          v-btn(small primary dark :to="`/weapons/${weapon.id}`") Weapon Page

</template>

<script>
  import WeaponInfo from "./WeaponInfo.vue";
  import WeaponType from "./WeaponType.vue";

  export default {
    components: {
      WeaponType, WeaponInfo
    },
    name: 'WeaponList',
    props: ['weapons'],
  };
</script>

