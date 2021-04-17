<template>
  <me-expansion-list
    :items="items"
    model="armor"
  >
    <template #[`header.expanded`]="{ item }">
      <me-armor-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
    </template>
    <template #[`header.placement`]="{ item }">
      {{ $t(`armor_placements.${item.placement}_title`) }}
    </template>
    <template #[`header.type`]="{ item }">
      {{ $t(`armor_types.${item.type}`) }}
    </template>
    <template #[`header.notes`]="{ item }">
      {{ tagsText(item.tags) }}
    </template>
    <template #[`header.cost`]="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template #body="{ item }">
      <me-armor-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeArmorList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    textColor (rarity) {
      return this.$store.getters['config/rarityTextColor'](rarity)
    },
    tagsText (tags) {
      return this.$t(`lists.comma_list[${tags.length}]`, tags.map(i => this.$t(`tags.${i}`)))
    }
  }
}
</script>
