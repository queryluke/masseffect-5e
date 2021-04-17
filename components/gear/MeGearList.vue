<template>
  <me-expansion-list
    :items="items"
    model="gear"
  >
    <template #[`header.expanded`]="{ item }">
      <me-gear-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
      <small>
        {{ $t(`gear_types.${item.type}`) }} <span v-if="item.subType">({{ $t(`gear_types.${item.subType}`) }})</span>
      </small>
    </template>
    <template #[`header.cost`]="{ item }">
      {{ cost(item.cost) }}
    </template>
    <template #body="{ item }">
      <me-gear-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MeGearList',
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
    cost (cost) {
      return cost === 0 ? '-' : this.$options.filters.groupDigits(cost, ',')
    }
  }
}
</script>
