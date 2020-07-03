<template lang="pug">
    span.
      ({{ roll.text }}): {{ display }}
</template>

<script>
export default {
  props: {
    roll: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    total () {
      return this.roll.values.reduce((a, b) => a + b, 0) + this.roll.bonus
    },
    display () {
      let text = `[${this.roll.values.join(',')}]`
      if (this.roll.bonus !== 0) {
        if (this.roll.bonus > 0) {
          text += ` + ${this.roll.bonus}`
        } else {
          text += ` - ${this.roll.bonus * -1}`
        }
      }
      text += ` = ${this.total}`
      return text
    }
  }
}
</script>
