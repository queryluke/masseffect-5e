<template>
  <div>
    <me-tpg s="6">
      Armor
    </me-tpg>
    <me-hr size="2" />
    <v-row>
      <v-col v-for="placement in placements" :key="placement" cols="12" sm="6">
        <v-list dense two-line>
          <v-subheader class="text-uppercase">
            {{ placement }}
          </v-subheader>
          <template v-for="item in itemsOfPlacement(placement)">
            <me-cs-equipment-list-item :key="item.uuid" :item="item" type="armor" :equip-disabled="isEquipped(placement) && !item.equipped">
              <template #title>
                <me-cs-equipment-title :rarity="item.data.rarity">
                  {{ item.data.name }}
                </me-cs-equipment-title>
              </template>
              <template #subtitle>
                <me-cs-equipment-subtitle :type="item.data.type" model="armor" :additional="{ placement: item.data.placement }" />
              </template>
            </me-cs-equipment-list-item>
            <v-divider :key="`divider-${item.uuid}`" />
          </template>
        </v-list>
      </v-col>
    </v-row>
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
  },
  data () {
    return {
      placements: ['head', 'chest', 'arms', 'legs']
    }
  },
  methods: {
    itemsOfPlacement (placement) {
      return this.items.filter(i => i.data.placement === placement)
    },
    isEquipped (placement) {
      return this.$store.getters['character/equipment/equippedArmor'].filter(i => i.data.placement === placement).length > 0
    }
  }
}
</script>
