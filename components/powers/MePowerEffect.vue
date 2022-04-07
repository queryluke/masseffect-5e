<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerEffect',
  props: {
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
      if (this.tags.length === 0) {
        return this.abbr ? '-' : this.$t('none')
      }
      if (this.abbr) {
        return `${this.tags[0]}${this.tags.length > 1 ? ' (...)' : ''}`
      } else {
        return this.$t(`lists.comma_list[${this.tags.length}]`, this.tags)
      }
    }
  }
}
</script>
