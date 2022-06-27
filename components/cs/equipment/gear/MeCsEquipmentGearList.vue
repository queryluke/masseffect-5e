<template>
  <div>
    <me-tpg s="6">
      Gear
    </me-tpg>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" type="gear">
          <template #action>
            <v-list-item-action>
              <v-avatar size="22" color="grey darken-2">
                {{ item.uses }}
              </v-avatar>
              <!--
              <v-btn fab x-small elevation="0">
                {{ item.uses }}
              </v-btn>
              -->
            </v-list-item-action>
          </template>
          <template #title>
            <me-cs-equipment-title :rarity="item.data.rarity">
              {{ item.data.name }}
            </me-cs-equipment-title>
          </template>
          <template #subtitle>
            <me-cs-equipment-subtitle :type="item.data.type" model="gear" />
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
