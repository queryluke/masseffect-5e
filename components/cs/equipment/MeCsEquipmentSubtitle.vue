<template>
  <span>
    {{ subtitle }}
  </span>
</template>

<script>
export default {
  props: {
    model: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    additional: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    subtitle () {
      switch (this.model) {
        case 'weapons':
          return this.$tc(`weapon_types.${this.type}`, 1)
        case 'armor':
          return `${this.$t(`armor_types.${this.type}_armor_title`)} (${this.$t(`armor_placements.${this.additional.placement}_title`)})`
        case 'gear':
          return `${this.$t(`gear_types.${this.type}`)}`
        default:
          return ''
      }
    }
  }
}
</script>
