<template>
  <span>
    <span v-if="!item.range.long">
      <me-distance :length="item.range.short" abbr />
    </span>
    <span v-else>
      (<me-distance :length="item.range.short" num-only />/<me-distance :length="item.range.long" abbr />)
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
          range: {
            short: 5
          },
          type: null
        }
      }
    }
  }
}
</script>
