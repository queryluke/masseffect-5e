<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <div>
        <me-tpg s="6">
          Gear
        </me-tpg>
      </div>
    </div>
    <me-hr size="2" />
    <div v-for="type of types" :key="`gear-${type}`">
      <v-list dense two-line>
        <v-subheader>
          <span>
            {{ $t(`gear_types.${type}`) }}{{ type.endsWith('gel') || type === 'ammo' ? '' : 's' }}
          </span>
          <span v-if="type === 'omni_tool_program' && enforcePrograms">
            <span>:</span>
            <span class="ml-1">
              {{ equippedPrograms }} of 3
            </span>
          </span>
        </v-subheader>
        <template v-for="item in items.filter(i => i.data.type === type)">
          <me-cs-equipment-list-item :key="item.uuid" :item="item" type="gear" :equip-disabled="(item.data.type === 'omni_tool_program' && (enforcePrograms && equippedPrograms === 3) && !item.equipped)">
            <template v-if="!item.data.equippable" #equip>
              <v-list-item-action>
                <v-chip color="grey darken-2" x-small style="width: 24px" class="px-0 d-flex justify-center">
                  {{ item.uses }}
                </v-chip>
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
            <template v-if="item.data.consumable && item.data.equippable" #action>
              <v-chip color="grey darken-2" x-small style="width: 24px" class="px-0 d-flex justify-center">
                {{ item.uses }}
              </v-chip>
            </template>
          </me-cs-equipment-list-item>
          <v-divider :key="`divider-${item.uuid}`" />
        </template>
      </v-list>
    </div>
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
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    medigel () {
      // TEMP: notAddable filter to prevent people from interacting with the base model
      return this.items.filter(i => i.data.type === 'medi_gel' && !i.data.notAddable)
    },
    grenades () {
      return this.items.filter(i => i.data.type === 'grenade' && !i.data.notAddable)
    },
    programs () {
      return this.items.filter(i => i.data.type === 'omni_tool_program')
    },
    equippedPrograms () {
      return this.programs.filter(i => i.equipped).length
    },
    types () {
      return [...new Set(this.items.map(i => i.data.type))].sort()
    },
    enforcePrograms () {
      return this.$store.getters['character/character'].options.programInstall
    },
    hasSettings () {
      const preferences = {}
      for (const key of ['thermalClips', 'medigelSlots', 'grenadeSlots']) {
        preferences[key] = this.$store.getters['character/character'].options[key] || false
      }
      return [
        preferences.medigelSlots && this.medigel.length,
        preferences.thermalClips,
        preferences.grenadeSlots && this.grenades.length
      ].some(i => i)
    }
  },
  methods: {
    showGearManager () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-equipment-gear-manager-side-nav')
    }
  }
}
</script>
