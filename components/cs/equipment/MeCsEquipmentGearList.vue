<template>
  <div>
    <me-tpg s="6">
      Gear
    </me-tpg>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" :tabs="[{ title: 'Details', slot: 'infoTab' }]" no-equip>
          <template #subtitle>
            Remaining Uses: {{ item.uses }}
          </template>
          <template #infoTab>
            <me-cs-equipment-gear-info :item="item" />
          </template>
        </me-cs-equipment-list-item>
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
