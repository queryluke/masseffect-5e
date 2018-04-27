<template lang="pug">
  v-expansion-panel(popout).mb-2
    v-expansion-panel-content(v-for="weapon in weapons" v-bind:key="weapon.id")
      div(slot="header")
        v-layout.spell-header
          v-flex.xs4.sm3.lg1
            weapon-type(:weapon="weapon")
          v-flex.xs8.sm9.lg3
            strong {{ weapon.name }}
          v-flex.hidden-md-and-down.lg2
            span {{ weapon.damage }}
          v-flex.hidden-md-and-down.lg2 {{ weapon.heat }}
          v-flex(v-if="weapon.type === 'Melee' || weapon.type === 'Heavy Weapon'").hidden-md-and-down.lg2
            span(v-if="weapon.range") {{ weapon.range }}m
          v-flex(v-else).hidden-md-and-down.lg2 ({{ weapon.range }}m / {{ Number.parseInt(weapon.range, 10) * 3 }}m)
          v-flex.hidden-md-and-down.lg2 {{ weapon.weight }}
          v-flex.hidden-md-and-down.lg2 {{ weapon.cost }}
      v-card.grey.lighten-3
        v-card-text
          weapon-info(:weapon="weapon").mt-2
        v-card-actions
          bookmark-button(:card="weapon" type="weapon" v-bind:props="{flat: true}")
</template>

<script>
  import WeaponInfo from '~/components/shared/WeaponInfo.vue'
  import WeaponType from '~/components/shared/WeaponType.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'

  export default {
    components: {
      WeaponType, WeaponInfo, BookmarkButton
    },
    name: 'WeaponList',
    props: ['weapons']
  }
</script>

