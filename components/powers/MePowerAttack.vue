<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerAttack',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          attackType: []
        }
      }
    },
    abbr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text () {
      if (typeof this.item.attackType === 'undefined' || this.item.attackType.length === 0) {
        return this.abbr ? '-' : 'None'
      }
      if (this.abbr) {
        const first = this.item.attackType[0]
        const additional = this.item.attackType.length > 1 ? ' (...)' : ''
        return `${first}${additional}`
      } else {
        return this.item.attackType.join(', ')
      }
    }
  }
}
</script>
