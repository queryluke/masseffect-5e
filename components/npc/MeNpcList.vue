<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-npc-title :item="item" />
    </template>
    <template #[`header.cr`]="{ item }">
      <me-npc-cr-text :cr-id="item.cr" />
    </template>
    <template #[`header.unit`]="{ item }">
      {{ $t(`npc.unit_types.${item.unit}`) }}
    </template>
    <template #body="{ item }">
      <me-npc-stat-block :stats="item" />
    </template>
  </me-expansion-list>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'
export default {
  name: 'MeNpcList',
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
      model: 'bestiary'
    }
  }
}
</script>
