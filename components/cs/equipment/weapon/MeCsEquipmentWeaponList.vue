<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <me-tpg s="6">
          Weapons
        </me-tpg>
      </div>
      <div class="d-flex align-center">
        <div class="text-caption">
          Weapon Slots: {{ currentSlots }} of {{ maxSlots }}
        </div>
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
                    <v-icon :color="smItem.equipped ? 'primary' : 'grey lighten-1'">
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
            <v-list-item-action>
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
      return 4
    },
    currentSlots () {
      return this.items.filter(i => i.equipped).reduce((a, c) => a + c.slots, 0)
    },
    smMechanic () {
      return this.$store.getters['character/mechanics/mechanics'].find(i => i.type === 'shoulder-mounts')
    },
    smWeapons () {
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
              equippable: (this.currentShoulderMounts + 1 <= this.smMechanic.max && otherSmWeaponSlotTotal + i.slots <= this.smMechanic.slots)
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
    },
    shoulderMountedWeapons: {
      get () {
        return this.$store.getters['character/character'].currentStats.shoulderMounts || []
      },
      set (value) {
        console.log(value)
        /*
        const smArray = JSON.parse(JSON.stringify(this.currentShoulderMounts))
        if (value) {
          smArray.push(this.item.uuid)
        } else {
          const currIndex = smArray.indexOf(this.item.uuid)
          smArray.splice(currIndex, 1)
        }
        console.log(smArray)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.shoulderMounts', value: smArray })
        */
      }
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
      console.log(index, uuid)
      if (index > -1) {
        this.$store.dispatch('character/equipment/REMOVE_FROM_SHOULDER_MOUNTS', uuid)
      } else {
        smArray.push(uuid)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.shoulderMounts', value: smArray })
      }
      this.$store.dispatch('character/equipment/TOGGLE_EQUIPPED', uuid)
    }
  }
}
</script>
