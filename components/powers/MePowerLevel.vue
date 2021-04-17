<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerType',
  props: {
    level: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    text () {
      return this.level === 0
        ? this.$t('cantrip')
        : this.$t(`ordinal_numbers[${this.level}]`)
    }
  }
}
</script>
