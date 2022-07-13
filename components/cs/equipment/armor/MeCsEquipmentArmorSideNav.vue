<template>
  <v-card v-if="item" flat tile>
    <me-cs-equipment-armor-info :item="item.data" :set-eq-count="setEqCount" />
    <v-card-text v-if="legacyCustom || item.data.slots > 0" class="pt-0">
      <div class="font-weight-bold">
        Mods
      </div>
      <div v-if="legacyCustom">
        <me-cs-equipment-mod-card v-for="legacyMod in item.mods" :id="legacyMod" :key="`legacy-mod-${legacyMod}`" />
      </div>
      <template v-for="(slot, index) in modPlacements">
        <me-cs-equipment-mod-card :id="item.mods[index]" :key="`mod-slot-${index}`" @remove="removeArmorMod(index)">
          {{ slot }}
        </me-cs-equipment-mod-card>
      </template>
    </v-card-text>
    <v-divider />
    <div v-if="item.data.slots > 0">
      <v-list-item @click="mods = !mods">
        <v-list-item-content>
          <v-list-item-title class="text-caption">
            Add Mods
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>
            {{ mods ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-expand-transition>
        <div v-show="mods">
          <v-card-text class="px-2 py-0">
            <me-cs-equipment-mods :filters="modFilters" :current="item.mods" @add="addArmorMod" />
          </v-card-text>
        </div>
      </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/equipment')

export default {
  name: 'MeCsEquipmentArmorSideNav',
  data () {
    return {
      customize: false,
      mods: false
    }
  },
  computed: {
    ...mapGetters(['armor', 'armorList', 'equippedArmor']),
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    item () {
      return this.armor.find(i => i.uuid === this.toDisplay)
    },
    legacyCustom () {
      return typeof this.item.custom === 'object' && this.item.mods.length
    },
    modPlacements () {
      if (!this.item.data.slots) {
        return []
      }
      return [...Array(this.item.data.slots).keys()].map(i => `Slot ${i + 1}`)
    },
    modFilters () {
      return [{ attr: 'type', value: 'armor' }, { attr: 'availability', value: this.item.data.type, array: true }, { attr: 'placement', value: this.item.data.placement }]
    },
    setEqCount () {
      if (this.item.set) {
        return 0
      } else {
        return this.equippedArmor.filter(i => i.data.set === this.item.data.set).length
      }
    }
  },
  methods: {
    addArmorMod (mod) {
      const mods = this.item.mods.slice()
      const firstNullIndex = mods.findIndex(i => i === null)
      if (firstNullIndex > -1) {
        mods.splice(firstNullIndex, 1, mod.id)
      } else if (mods.length === this.item.data.slots) {
        mods.splice(-1, 1, mod.id)
      } else {
        mods.push(mod.id)
      }
      const changeItem = { ...this.item, mods }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement: changeItem })
    },
    removeArmorMod (index) {
      const mods = this.item.mods.slice()
      mods.splice(index, 1, null)
      const changeItem = { ...this.item, mods }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement: changeItem })
    }
  }
}
</script>
