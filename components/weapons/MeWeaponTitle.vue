<template>
  <me-item-title
    subtitle
  >
    <template #title>
      <span>
        {{ item.name }}
      </span>
      <span v-if="item.author" class="text-caption font-italic">
        by {{ item.author }}
      </span>
    </template>
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
  name: 'MeWeaponTitle',
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
      return this.$t('weapon_item_subtitle', {
        rarity: this.$t(`rarities.${this.item.rarity}`),
        weaponType: this.$tc(`weapon_types.${this.item.type}`, 1)
      })
    }
  }
}
</script>
