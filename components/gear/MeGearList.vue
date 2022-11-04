<template>
  <me-expansion-list
    :items="items"
    :headers="headers"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-gear-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold text-truncate" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
    </template>
    <template #[`header.name.subtitle`]="{ item }">
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
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MeGearList',
  mixins: [ListPageHelpers],
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      model: 'gear'
    }
  },
  methods: {
    cost (cost) {
      return cost === 0 ? '-' : this.$options.filters.groupDigits(cost, ',')
    }
  }
}
</script>
