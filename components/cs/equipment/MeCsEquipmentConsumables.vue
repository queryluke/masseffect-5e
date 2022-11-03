<template>
  <v-card flat>
    <v-card-text v-if="settingsOff">
      <p class="text-caption">
        To track your consumables (grenades, medi-gel, and thermal clips), you must turn these options on in your
        character preferences.
      </p>
      <v-btn small @click="showCharacterMenu">
        Edit Preferences
      </v-btn>
    </v-card-text>
    <!-- Thermal Clips -->
    <v-list v-if="settings.clips" two-line dense>
      <v-subheader>Thermal Clips</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Equipped: {{ thermalClips.equipped }} of {{ thermalClips.max }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Available: {{ thermalClips.available }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn x-small outlined :disabled="thermalClips.equipped === thermalClips.max || thermalClips.available === 0" color="primary" @click="setThermalClips">
            Equip
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <!-- Medi-Gel -->
    <v-list v-if="settings.medigel" dense two-line>
      <v-subheader>Medi-gel: {{ currentMedigel }} of {{ maxMedigel }}</v-subheader>
      <template v-for="gel of medigel">
        <v-list-item :key="gel.uuid" :disabled="viewOnly" style="min-height: 30px" class="mb-2">
          <v-list-item-content class="py-0">
            <v-list-item-title style="min-width: 50px">
              {{ gel.data.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Available: {{ gel.uses }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="mr-2 my-0">
            <v-btn x-small icon :disabled="gel.equippedAmount === 0" @click="updateEqAmount('decrement', gel.uuid)">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action class="my-0 mx-1">
            <v-chip small>
              {{ gel.equippedAmount }}
            </v-chip>
          </v-list-item-action>
          <v-list-item-action class="ml-2 my-0">
            <v-btn x-small icon :disabled="currentMedigel + 1 > maxMedigel || gel.equippedAmount === gel.uses" @click="updateEqAmount('increment', gel.uuid)">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

    <!-- Grenades -->
    <v-list v-if="settings.grenades" dense two-line>
      <v-subheader>Grenades: {{ currentGrenades }} of {{ maxGrenades }}</v-subheader>
      <template v-for="grenade of grenades">
        <v-list-item :key="grenade.uuid" :disabled="viewOnly" style="min-height: 30px" class="mb-2">
          <v-list-item-content class="py-0">
            <v-list-item-title style="min-width: 50px">
              {{ grenade.data.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Available: {{ grenade.uses }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="mr-2 my-0">
            <v-btn x-small icon :disabled="grenade.equippedAmount === 0" @click="updateEqAmount('decrement', grenade.uuid)">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action class="my-0 mx-1">
            <v-chip small>
              {{ grenade.equippedAmount }}
            </v-chip>
          </v-list-item-action>
          <v-list-item-action class="ml-2 my-0">
            <v-btn x-small icon :disabled="currentGrenades + 1 > maxGrenades || grenade.equippedAmount === grenade.uses" @click="updateEqAmount('increment', grenade.uuid)">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <v-divider v-if="settings.grenades && settings.programs" vertical />
    <!-- Omni-Tool Programs -->
    <div v-if="settings.programs" class="text-caption">
      Programs: {{ equippedPrograms.length }} of 3
    </div>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/equipment')

export default {
  name: 'MeCsEquipmentConsumables',
  computed: {
    ...mapGetters(['gear', 'capacities', 'thermalClips']),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    settings () {
      const preferences = {}
      for (const key of ['thermalClips', 'medigelSlots', 'grenadeSlots', 'programInstall']) {
        preferences[key] = this.$store.getters['character/character'].options[key] || false
      }
      return {
        medigel: preferences.medigelSlots,
        clips: preferences.thermalClips,
        grenades: preferences.grenadeSlots
      }
    },
    settingsOff () {
      return !this.settings.medigel && !this.settings.clips && !this.settings.grenades
    },
    medigel () {
      // TEMP: notAddable filter to prevent people from interacting with the base model
      return this.gear.filter(i => i.data.type === 'medi_gel' && !i.data.notAddable)
    },
    maxMedigel () {
      return this.capacities.medigelSlots
    },
    currentMedigel () {
      return this.medigel.filter(i => i.equipped).reduce((a, c) => a + (c.equippedAmount || 0), 0)
    },
    grenades () {
      return this.gear.filter(i => i.data.type === 'grenade' && !i.data.notAddable)
    },
    maxGrenades () {
      return this.capacities.grenadeSlots
    },
    currentGrenades () {
      return this.grenades.filter(i => i.equipped).reduce((a, c) => a + (c.equippedAmount || 0), 0)
    }
  },
  methods: {
    updateEqAmount (which, uuid) {
      const item = this.gear.find(i => i.uuid === uuid)
      if (!item) {
        return
      }
      const equippedAmount = which === 'increment'
        ? Math.min(item.uses, (item.equippedAmount + 1))
        : Math.max(0, (item.equippedAmount - 1))
      const changeItem = { ...item, equippedAmount, equipped: equippedAmount > 0 }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: item.uuid, replacement: changeItem })
    },
    setThermalClips () {
      this.$store.dispatch('character/equipment/SET_THERMAL_CLIPS')
    },
    showCharacterMenu () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-character-side-nav')
    }
  }
}
</script>
