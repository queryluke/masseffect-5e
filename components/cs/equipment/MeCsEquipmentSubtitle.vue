<template>
  <me-equipment-subtitle :rarity="item.rarity" :text="subtitle" />
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
          return this.$t('weapon_item_subtitle', {
            rarity: this.$t(`rarities.${this.item.rarity}`),
            weaponType: this.$tc(`weapon_types.${this.item.type}`, 1)
          })
        case 'armor':
          return this.$t('armor_item_subtitle', {
            rarity: this.$t(`rarities.${this.item.rarity}`),
            armorType: this.$t(`armor_types.${this.item.type}_armor`),
            placement: this.$t(`armor_placements.${this.item.placement}`)
          })
        case 'gear':
          return `${this.item.rarity} ${this.$t(`gear_types.${this.item.type}`)}`
        default:
          return ''
      }
    }
  }
}
</script>
