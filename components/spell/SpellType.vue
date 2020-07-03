<template lang="pug">
  span
    v-avatar(size="30")
      img(:src="`/images/spells/${spell.type}.svg`")
    span  {{ level }}
</template>

<script>
export default {
  props: {
    spell: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      level: ''
    }
  },
  created () {
    switch (this.spell.level) {
      case 0:
        this.level = 'cantrip'
        break
      case 1:
        this.level = '1st-level'
        break
      case 2:
        this.level = '2nd-level'
        break
      case 3:
        this.level = '3rd-level'
        break
      default:
        this.level = `${this.spell.level}th-level`
    }
  }
}
</script>
