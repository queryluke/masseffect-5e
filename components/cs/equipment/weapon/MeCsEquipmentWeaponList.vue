<template>
  <div>
    <me-tpg s="6">
      Weapons
    </me-tpg>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" type="weapon">
          <template #title>
            <me-cs-equipment-title :rarity="item.data.rarity">
              {{ item.overrides.name || item.data.name }}
            </me-cs-equipment-title>
          </template>
          <template #subtitle>
            <me-cs-equipment-subtitle :type="item.data.type" model="weapons" />
          </template>
        </me-cs-equipment-list-item>
        <v-divider :key="`divider-${item.uuid}`" />
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'MeCsEquipmentWeaponList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
