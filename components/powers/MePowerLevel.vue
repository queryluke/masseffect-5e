<template>
  <span>
    {{ level }}
  </span>
</template>

<script>
export default {
  name: 'MePowerType',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          level: 0
        }
      }
    }
  },
  computed: {
    level () {
      return this.item.level === 0 ? 'cantrip' : `${this.item.level}${this.$options.filters.ordinal(this.item.level)}`
    }
  }
}
</script>
