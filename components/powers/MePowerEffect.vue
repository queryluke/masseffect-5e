<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerEffect',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          effect: [],
          damageType: []
        }
      }
    },
    abbr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDamage () {
      return this.item.effect.includes('damage')
    },
    text () {
      if (
        (typeof this.item.effect === 'undefined' || this.item.effect.length === 0) &&
        (typeof this.item.damageType === 'undefined' || this.item.damageType.length === 0)
      ) { return this.abbr ? '-' : 'None' }
      if (this.abbr) {
        let first = this.item.effect[0]
        if (this.isDamage) {
          first = this.item.damageType[0]
        }
        const additional = (this.item.damageType.length > 1 || this.item.effect.length > 1) ? ' (...)' : ''
        return `${first}${additional}`
      } else {
        return [...this.item.damageType, ...this.item.effect].join(', ')
      }
    }
  }
}
</script>
