<template>
  <span>{{ range }}</span>
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
    range () {
      const rangeNum = Number.parseInt(this.item.range, 10)
      switch (this.item.type) {
        case 'Melee':
          // TODO: reach weapons
          return '2m'
        case 'Heavy Weapon':
          return `${rangeNum}m`
        case 'Shotgun':
          return `(${rangeNum}/${rangeNum * 2}m)`
        default:
          return `(${rangeNum}/${rangeNum * 3}m)`
      }
    }
  }
}
</script>
