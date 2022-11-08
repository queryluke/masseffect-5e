<template>
  <me-expansion-list
    :items="items"
    :headers="headers"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-weapon-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
    </template>
    <template #[`header.name.subtitle`]="{ item }">
      <div class="d-flex align-center">
        <small class="mr-2">
          {{ $tc(`weapon_types.${item.type}`, 1) }}
        </small>
        <me-andromeda-chip v-if="item.andromeda" />
      </div>
    </template>
    <template #[`header.range`]="{ item }">
      <me-weapon-range :item="item" />
    </template>
    <template #[`header.damage`]="{ item }">
      {{ $t('dice', {dieType: item.damage.dieType, dieCount: dieCount(item.damage.dieCount)}) }} {{ $t(`damage_types.${item.damage.type}`) }}
    </template>
    <template #[`header.cost`]="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template #[`header.weight`]="{ item }">
      <me-weight :amount="item.weight" num-only />
    </template>
    <template #body="{ item }">
      <me-weapon-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MeWeaponList',
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
      model: 'weapons'
    }
  },
  methods: {
    dieCount (dieCount) {
      return typeof dieCount === 'object' ? 'X' : dieCount
    }
  }
}
</script>
