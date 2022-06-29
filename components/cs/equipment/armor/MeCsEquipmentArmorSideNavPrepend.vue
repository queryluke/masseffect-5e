<template>
  <v-list-item v-if="item" two-line>
    <v-list-item-content>
      <v-list-item-title>
        <me-cs-equipment-title :rarity="item.data.rarity">
          {{ item.data.name }}
        </me-cs-equipment-title>
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption text-capitalize">
        <me-cs-equipment-subtitle :type="item.data.type" model="armor" :additional="{ placement: item.data.placement }" />
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn small outlined color="error" @click="removeEquipment">
        Delete
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>

export default {
  name: 'MeCsEquipmentArmorSideNavPrepend',
  computed: {
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    item () {
      return this.$store.getters['character/equipment/armor'].find(i => i.uuid === this.toDisplay)
    }
  },
  methods: {
    removeEquipment () {
      this.$store.commit('character/navigation/SET', { key: 'sideNav', value: false })
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid })
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: null })
    }
  }
}
</script>
