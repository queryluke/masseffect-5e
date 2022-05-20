<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerCastingTime',
  props: {
    mechanic: {
      type: Object,
      default: () => {
        return {
          castingTime: {
            unit: 'action'
          },
          altCasting: []
        }
      }
    }
  },
  computed: {
    castingTimes () {
      return [this.mechanic.castingTime, ...(this.mechanic.altCasting || [])]
    },
    text () {
      const array = []
      for (const timeObj of this.castingTimes) {
        if (['action', 'reaction', 'attack', 'bonus_action'].includes(timeObj.unit)) {
          array.push(this.$t(`times.${timeObj.unit}_title`))
        } else {
          this.$tc(`times.${timeObj.unit}`, timeObj.length, { n: timeObj.length })
        }
      }
      return array.length === 0
        ? '-'
        : this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
</script>
