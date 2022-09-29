<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <me-tpg s="6">
          Weapons
        </me-tpg>
      </div>
      <div class="d-flex align-center">
        <div v-if="maxSlots < 99" class="text-caption">
          <v-icon v-if="currentSlots > maxSlots" color="error" small>
            mdi-alert-octagram
          </v-icon>
          Slots: {{ currentSlots }} of {{ maxSlots }}
        </div>
        <v-divider v-if="smMechanic" vertical class="ml-2" />
        <div v-if="smMechanic" class="ml-2">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-card outlined v-bind="attrs" class="pl-1" v-on="on">
                <span class="text-caption">
                  Shoulder Mounts ({{ currentShoulderMounts.length }})
                </span>
                <v-icon size="16">
                  mdi-menu-down
                </v-icon>
              </v-card>
            </template>
            <v-card>
              <v-card-text v-if="smWeapons.length === 0">
                <div class="text-caption">
                  No shoulder-mountable weapons found
                </div>
              </v-card-text>
              <v-list dense>
                <v-list-item v-for="smItem of smWeapons" :key="smItem.uuid" :disabled="viewOnly || (!smItem.smData.equipped && !smItem.smData.equippable)" @click.stop="equipToSm(smItem.uuid)">
                  <v-list-item-action>
                    <v-icon :color="smItem.smData.equipped ? 'primary' : 'grey lighten-1'">
                      {{ smItem.smData.equipped ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ smItem.data.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    </div>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" type="weapon" :equip-disabled="!item.equipped && (currentSlots + item.slots > maxSlots)">
          <template v-if="smMechanic && equippedInShoulderMount(item.uuid)" #action>
            <v-list-item-action class="ma-0">
              <v-avatar size="20" color="grey darken-2">
                <span class="text-caption">
                  <small>
                    SM
                  </small>
                </span>
              </v-avatar>
            </v-list-item-action>
          </template>
          <template #title>
            <me-cs-equipment-title :rarity="item.data.rarity">
              {{ item.data.name }}
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
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    maxSlots () {
      // TODO: armor mods that increase slots && override setting
      return !this.$store.getters['character/character'].options.weaponSlots
        ? 99
        : this.$store.getters['character/mechanics/mechanics'].filter(i => i.type === 'weapon-slots').reduce((a, c) => a + c.value, 4)
    },
    currentSlots () {
      const equippedInStandardSlots = this.items.filter(i => i.equipped).reduce((a, c) => a + c.slots, 0)
      const equippedInShoulderMounts = this.smWeapons.filter(i => i.smData.equipped).reduce((a, c) => a + c.slots, 0)
      return equippedInStandardSlots - equippedInShoulderMounts
    },
    smMechanic () {
      return this.$store.getters['character/mechanics/mechanics'].find(i => i.type === 'shoulder-mounts')
    },
    smWeapons () {
      if (!this.smMechanic) {
        return []
      }
      const weaponProfs = this.$store.getters['character/profs/profs']
      const equippedSmWeapons = this.items.filter(i => this.currentShoulderMounts.includes(i.uuid))
      return this.items
        .filter((i) => {
          const type = i.data.type
          if (type === 'melee') {
            return false
          }
          if (this.smMechanic.proficient) {
            if (!weaponProfs.weapon.includes(type)) {
              return false
            }
          }
          return true
        })
        .map((i) => {
          const otherSmWeaponSlotTotal = equippedSmWeapons.filter(other => other.uuid !== i.uuid).reduce((a, c) => a + c.slots, 0)
          return {
            ...i,
            smData: {
              equipped: this.equippedInShoulderMount(i.uuid),
              equippable: ((this.currentShoulderMounts.length + 1 <= this.smMechanic.max) && (otherSmWeaponSlotTotal + i.slots <= this.smMechanic.slots))
            }
          }
        })
    },
    currentShoulderMounts () {
      return this.$store.getters['character/character'].currentStats.shoulderMounts || []
    },
    smDisabled () {
      if (this.smStatus) {
        return false
      }
      const otherWeaponUuids = this.currentShoulderMounts.filter(i => i !== this.item.uuid)
      const otherWeapons = this.weapons.filter(i => otherWeaponUuids.includes(i.uuid))
      const currSlotsConsumed = otherWeapons.reduce((a, c) => a + c.slots, 0)
      return ((this.item.slots + currSlotsConsumed > this.smMechanic.slots) || (this.currentShoulderMounts.length + 1 > this.smMechanic.max))
    }
  },
  methods: {
    equippedInShoulderMount (uuid) {
      return this.currentShoulderMounts.includes(uuid)
    },
    equipToSm (uuid) {
      if (this.viewOnly) {
        return
      }
      const smArray = JSON.parse(JSON.stringify(this.currentShoulderMounts))
      const index = smArray.indexOf(uuid)
      const isEquipped = this.$store.getters['character/equipment/equippedWeapons'].find(i => i.uuid === uuid)
      if (index > -1) {
        if (isEquipped) {
          this.$store.dispatch('character/equipment/TOGGLE_EQUIPPED', uuid)
        } else {
          this.$store.dispatch('character/equipment/REMOVE_FROM_SHOULDER_MOUNTS', uuid)
        }
      } else {
        if (!isEquipped) {
          this.$store.dispatch('character/equipment/TOGGLE_EQUIPPED', uuid)
        }
        smArray.push(uuid)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.shoulderMounts', value: smArray })
      }
    }
  }
}
</script>
