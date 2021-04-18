<template>
  <me-expansion-list
    :items="items"
    :headers="headers"
    :type="model"
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
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MeArmorList',
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
      model: 'armor'
    }
  }
}
</script>
