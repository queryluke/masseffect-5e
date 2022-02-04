<template>
  <div>
    <me-tpg s="6">
      Weapons
    </me-tpg>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item">
          <template #infoTab>
            <me-cs-equipment-weapon-info :item="item" />
          </template>
          <template #modTab>
            <me-cs-equipment-weapon-mods :item="item" />
          </template>
          <template #overrideTab>
            <me-cs-equipment-weapon-override :item="item" />
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
