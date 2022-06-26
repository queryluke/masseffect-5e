<template>
  <v-card v-if="item" flat tile>
    <div v-if="shoulderMountable">
      <v-card flat tile>
        <v-card-text class="d-flex justify-space-between align-center">
          <div>
            Equip in Shoulder Mounts
          </div>
          <v-switch v-model="smStatus" dense class="mt-n1 pt-0 ml-4" :disabled="smDisabled" hide-details />
        </v-card-text>
      </v-card>
      <v-divider />
    </div>

    <me-cs-equipment-weapon-info :item="info" />
    <v-card-text class="pt-0">
      <div class="font-weight-bold">
        Mods
      </div>
      <template v-for="slot in modPlacements">
        <me-cs-equipment-mod-card :id="item.mods[slot]" :key="slot" @remove="removeWeaponMod(slot)">
          {{ slot }}
        </me-cs-equipment-mod-card>
      </template>
    </v-card-text>
    <v-divider />
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
      return { ...this.item.data, ...this.item.overrides }
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
    shoulderMountable () {
      if (this.info.type === 'melee') {
        return false
      }
      if (!this.item.equipped) {
        return false
      }
      const shoulderMounts = this.$store.getters['character/mechanics/mechanics'].find(i => i.type === 'shoulder-mounts')
      if (!shoulderMounts) {
        return false
      }
      if (shoulderMounts.proficient) {
        const weaponProfs = this.$store.getters['character/profs/profs']
        const weaponType = this.info.type
        if (!weaponProfs.weapon.includes(weaponType)) {
          return false
        }
      }
      return true
    },
    smDisabled () {
      if (this.smStatus) {
        return false
      }
      const shoulderMounts = this.$store.getters['character/mechanics/mechanics'].find(i => i.type === 'shoulder-mounts')
      const weaponSlots = this.info.properties.includes('two-handed') ? 2 : 1
      const smStats = this.$store.getters['character/character'].currentStats.shoulderMounts || { weapons: [], slots: 0 }
      return ((smStats.slots + weaponSlots > shoulderMounts.slots) || (smStats.weapons.length + 1 > shoulderMounts.max))
    },
    smStatus: {
      get () {
        return (this.$store.getters['character/character'].currentStats.shoulderMounts || { weapons: [], slots: 0 }).weapons.includes(this.item.uuid)
      },
      set (value) {
        const currentStats = JSON.parse(JSON.stringify(this.$store.getters['character/character'].currentStats.shoulderMounts || { weapons: [], slots: 0 }))
        const weaponSlots = this.info.properties.includes('two-handed') ? 2 : 1
        if (value) {
          currentStats.weapons.push(this.item.uuid)
          currentStats.slots += weaponSlots
        } else {
          const currIndex = currentStats.weapons.indexOf(this.item.uuid)
          currentStats.weapons.splice(currIndex, 1)
          currentStats.slots = Math.max(0, currentStats.slots - weaponSlots)
        }
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.shoulderMounts', value: currentStats })
      }
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
