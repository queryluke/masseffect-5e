<template>
  <v-card v-if="item" flat tile>
    <me-cs-equipment-weapon-info :item="info" />
    <v-card-text v-if="moddable" class="pt-0">
      <div class="font-weight-bold">
        Mods
      </div>
      <template v-for="slot in modPlacements">
        <me-cs-equipment-mod-card :id="item.mods[slot]" :key="slot" @remove="removeWeaponMod(slot)">
          {{ slot }}
        </me-cs-equipment-mod-card>
      </template>
    </v-card-text>
    <v-divider v-if="moddable" />
    <v-list-item v-if="moddable" @click="mods = !mods">
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
          <me-cs-equipment-mods :filters="modFilters" :secondary-filter="modSecondaryFilter" :current="currentMods" @add="changeWeaponMod" />
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-divider />
    <v-list-item @click="customize = !customize">
      <v-list-item-content>
        <v-list-item-title class="text-caption">
          Customize
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>
          {{ customize ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-expand-transition>
      <div v-show="customize">
        <v-card-text class="px-4">
          <me-cs-equipment-weapon-override :item="item" />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/equipment')

export default {
  name: 'MeCsEquipmentWeaponSideNav',
  data () {
    return {
      customize: false,
      mods: false
    }
  },
  computed: {
    ...mapGetters(['weapons', 'weaponsList']),
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    item () {
      return this.weapons.find(i => i.uuid === this.toDisplay)
    },
    info () {
      return this.item.data
    },
    modPlacements () {
      return this.info.type === 'melee' ? ['grip', 'strike'] : ['ammo', 'barrel', 'body', 'magazine']
    },
    modFilters () {
      return [{ attr: 'type', value: 'weapon' }, { attr: 'availability', value: this.item.data.type, array: true }]
    },
    modSecondaryFilter () {
      return {
        attr: 'placement',
        options: this.modPlacements
      }
    },
    currentMods () {
      return Object.values(this.item.mods)
    },
    moddable () {
      return !this.item.data.properties.includes('special')
    }
  },
  methods: {
    changeWeaponMod (mod) {
      const changeItem = { ...this.item, mods: { ...this.item.mods, [mod.placement]: mod.id } }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement: changeItem })
    },
    removeWeaponMod (placement) {
      const changeItem = { ...this.item, mods: { ...this.item.mods, [placement]: null } }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement: changeItem })
    }
  }
}
</script>
