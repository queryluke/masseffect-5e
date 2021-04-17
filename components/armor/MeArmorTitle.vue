<template>
  <me-item-title
    :title="item.name"
    subtitle
  >
    <template #subtitle>
      <me-equipment-subtitle :rarity="item.rarity" :text="subtitle" />
      <div class="text-caption">
        {{ item.cost | groupDigits(',') }}
      </div>
    </template>
  </me-item-title>
</template>

<script>
export default {
  name: 'MeArmorTitle',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          rarity: 'Common',
          armorType: '',
          cost: 0
        }
      }
    }
  },
  computed: {
    subtitle () {
      return this.$t('armor_item_subtitle', {
        rarity: this.$t(`rarities.${this.item.rarity}`),
        armorType: this.$t(`armor_types.${this.item.type}_armor`),
        placement: this.$t(`armor_placements.${this.item.placement}`)
      })
    }
  }
}
</script>
