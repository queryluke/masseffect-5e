<template>
  <v-list-item dense style="min-height: 38px" @click="showItem">
    <slot name="action">
      <v-list-item-action class="my-0" @click.stop="toggleEquipped">
        <v-icon :color="iconColor">
          {{ item.equipped ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
        </v-icon>
      </v-list-item-action>
    </slot>
    <v-list-item-content class="py-0">
      <v-list-item-title>
        <slot name="title" />
      </v-list-item-title>
      <v-list-item-subtitle class="mt-n1">
        <small>
          <slot name="subtitle" />
        </small>
      </v-list-item-subtitle>
    </v-list-item-content>
    <!--
    <v-list-item-action v-if="!viewOnly" class="my-0" @click="equipmentDialog = true">
      <v-icon>
        mdi-cog
      </v-icon>
    </v-list-item-action>
    -->
    <!--
    <me-standard-dialog :shown="equipmentDialog" :max-height="500" @close="equipmentDialog = false">
      <template #title>
        {{ title }}
      </template>
      <v-row justify="space-between">
        <v-col>
          <v-chip-group v-model="tab" active-class="primary--text">
            <v-chip
              v-for="cTab in tabs"
              :key="`feature-chip-tab-${cTab.slot}`"
              small
            >
              {{ cTab.title }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-chip-group>
            <v-chip small color="error" @click="equipmentDialog = false; removeEquipment()">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-tabs-items v-model="tab">
        <template v-for="tTab in tabs">
          <v-tab-item :key="`tTab-${tTab.slot}`">
            <v-card-text>
              <slot :name="tTab.slot" />
            </v-card-text>
          </v-tab-item>
        </template>
      </v-tabs-items>
    </me-standard-dialog>
    -->
    <v-list-item-action>
      <v-btn x-small outlined color="error" :disabled="viewOnly" @click.stop="removeEquipment">
        <v-icon size="16">
          mdi-delete
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'MeCsEquipmentListItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    equipDisabled: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Array,
      default: () => [{ title: 'Info', slot: 'infoTab' }, { title: 'Mods', slot: 'modTab' }, { title: 'Stat Overrides', slot: 'overrideTab' }]
    }
  },
  data () {
    return {
      equipmentDialog: false,
      loading: false,
      tab: 0
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    iconColor () {
      return this.viewOnly || this.equipDisabled
        ? 'grey darken-2'
        : this.item.equipped
          ? 'primary'
          : 'grey lighten-1'
    },
    itemData () {
      return this.item.data
    },
    title () {
      return this.itemData.name
    },
    subtitle () {
      switch (this.item.type) {
        case 'weapon':
          return this.$tc(`weapon_types.${this.itemData.type}`, 1)
        case 'armor':
          return `${this.$t(`armor_types.${this.itemData.type}`)} ${this.$t(`armor_placements.${this.itemData.placement}_title`)}`
        default:
          return ''
      }
    },
    shoulderMountable () {
      if (this.item.type !== 'weapon') {
        return false
      }
      if (this.item.data.type === 'melee') {
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
        const weaponType = this.item.data.type
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
      const weaponSlots = this.item.data.properties.includes('two-handed') ? 2 : 1
      const smStats = this.$store.getters['character/character'].currentStats.shoulderMounts || { weapons: [], slots: 0 }
      if ((smStats.slots + weaponSlots > shoulderMounts.slots) || (smStats.weapons.length + 1 > shoulderMounts.max)) {
        return true
      }
      return false
    },
    smStatus: {
      get () {
        return (this.$store.getters['character/character'].currentStats.shoulderMounts || { weapons: [], slots: 0 }).weapons.includes(this.item.uuid)
      },
      set (value) {
        const currentStats = JSON.parse(JSON.stringify(this.$store.getters['character/character'].currentStats.shoulderMounts || { weapons: [], slots: 0 }))
        const weaponSlots = this.item.data.properties.includes('two-handed') ? 2 : 1
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
    toggleEquipped () {
      if (this.viewOnly || this.equipDisabled) {
        return
      }
      this.$store.dispatch('character/equipment/TOGGLE_EQUIPPED', this.item.uuid)
    },
    removeEquipment () {
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid })
      if (this.type === 'weapon') {
        this.$store.dispatch('character/equipment/REMOVE_FROM_SHOULDER_MOUNTS', this.item.uuid)
      }
    },
    showItem () {
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: this.item.uuid })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', `me-cs-equipment-${this.type}-side-nav`)
    }
  }
}
</script>
