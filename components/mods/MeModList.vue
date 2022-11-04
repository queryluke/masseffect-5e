<template>
  <me-expansion-list
    :items="items"
    :headers="headers"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-mod-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
    </template>
    <template #[`header.name.subtitle`]="{ item }">
      <small>
        {{ $t(`mod_types.${item.type}`) }}
      </small>
    </template>
    <template #[`header.placement`]="{ item }">
      {{ $t(`mod_placements.${item.placement}`) }}
    </template>
    <template #[`header.notes`]="{ item }">
      {{ tagsText(item.tags) }}
    </template>
    <template #[`header.availability`]="{ item }">
      <me-mod-availability :item="item" />
    </template>
    <template #[`header.cost`]="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template #body="{ item }">
      <me-mod-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>

import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MeModList',
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
      model: 'mods'
    }
  }
}
</script>
