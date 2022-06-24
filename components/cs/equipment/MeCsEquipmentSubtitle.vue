<template>
  <span>
    {{ subtitle }}
  </span>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    subtitle () {
      switch (this.item.modelType) {
        case 'weapons':
          return this.$tc(`weapon_types.${this.item.type}`, 1)
        case 'armor':
          return `${this.$t(`armor_types.${this.item.type}_armor_title`)} (${this.$t(`armor_placements.${this.item.placement}_title`)})`
        case 'gear':
          return `${this.$t(`gear_types.${this.item.type}`)}`
        default:
          return ''
      }
    }
  }
}
</script>
