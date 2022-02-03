<template>
  <div>
    <me-tpg s="6">
      Armor
    </me-tpg>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" :tabs="item.custom ? [{ title: 'Info', slot: 'infoTab' }, { title: 'Mods', slot: 'modTab' }] : [{ title: 'Info', slot: 'infoTab' }]">
          <template #infoTab>
            <me-armor-info :item="item.data" />
          </template>
          <template #modTab>
            <me-cs-equipment-armor-mods v-if="item.custom" :item="item" />
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
