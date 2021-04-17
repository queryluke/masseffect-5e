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
  name: 'MeModTitle',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          rarity: 'Common',
          type: '',
          cost: 0
        }
      }
    }
  },
  computed: {
    subtitle () {
      return this.$t('mod_item_subtitle', {
        rarity: this.$t(`rarities.${this.item.rarity}`),
        modType: this.$t(`mod_types.${this.item.type}`)
      })
    }
  }
}
</script>
