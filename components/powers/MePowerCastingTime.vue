<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerCastingTime',
  props: {
    castingTimes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    text () {
      const array = []
      for (const time of this.castingTimes) {
        array.push(this.$t(`times.${time}_title`))
      }
      return array.length === 0
        ? '-'
        : this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
</script>
