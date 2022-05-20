<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.name }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption text-capitalize">
        <me-equipment-subtitle v-if="item.data.rarity" :rarity="item.data.rarity" :text="subtitle" />
        <span v-else>
          {{ item.data.type.replace('-', ' ') }}
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>

export default {
  name: 'MeCsPowerSelectPrepend',
  computed: {
    item () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    subtitle () {
      return this.$t('weapon_item_subtitle', {
        rarity: this.$t(`rarities.${this.item.data.rarity}`),
        weaponType: this.$tc(`weapon_types.${this.item.data.type}`, 1)
      })
    }
  }
}
</script>
