<template>
  <div>
    <me-tpg s="6">
      Armor
    </me-tpg>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" type="armor">
          <template #title>
            {{ item.data.name }}
          </template>
          <template #subtitle>
            <me-cs-equipment-subtitle :type="item.data.type" model="armor" :additional="{ placement: item.data.placement }" />
          </template>
        </me-cs-equipment-list-item>
        <v-divider :key="`divider-${item.uuid}`" />
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'MeCsEquipmentArmorList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
