<template>
  <span>
    <span v-if="meleeWeapon">
      <me-distance :length="item.range" abbr />
    </span>
    <span v-else>
      (<me-distance :length="item.range" num-only />/<me-distance :length="extendedRange" abbr />)
    </span>
  </span>
</template>
<script>
export default {
  name: 'MeWeaponRange',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          range: 0,
          type: null
        }
      }
    }
  },
  computed: {
    meleeWeapon () {
      return this.item.type === 'melee'
    },
    extendedRange () {
      const rangeNum = Number.parseInt(this.item.range, 10)
      const multiplier = this.item.type === 'shotgun' ? 2 : 3
      return rangeNum * multiplier
    }
  }
}
</script>
