<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerEffect',
  props: {
    damageTypes: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    abbr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text () {
      const array = []
      for (const dmg of this.damageTypes) {
        array.push(this.$t(`damage_types.${dmg}_damage`))
      }
      for (const tag of this.tags) {
        if (tag === 'damage') {
          continue
        }
        array.push(this.$t(`tags.${tag}`))
      }
      if (array.length === 0) {
        return this.abbr ? '-' : this.$t('none')
      }
      if (this.abbr) {
        return `${array[0]} (...)`
      } else {
        return this.$t(`lists.comma_list[${array.length}]`, array)
      }
    }
  }
}
</script>
