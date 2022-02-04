<template>
  <div>
    <me-cs-card-title v-if="$vuetify.breakpoint.smAndDown">
      Equipment
    </me-cs-card-title>
    <v-row class="my-2">
      <v-col cols="12" md="3">
        <v-text-field
          v-model="credits"
          label="Credits"
          outlined
          dense
          hide-details
          :disabled="viewOnly"
        />
      </v-col>
      <v-col v-if="!viewOnly" class="text-right">
        <v-btn outlined @click="addEquipmentDialog = true">
          Add Equipment
        </v-btn>
      </v-col>
    </v-row>

    <v-chip-group v-model="tab" active-class="primary--text">
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`feature-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>

    <div class="mt-3">
      <me-cs-equipment-weapon-list v-if="[0, 1].includes(tab)" :items="weapons" />
      <me-cs-equipment-armor-list v-if="[0, 2].includes(tab)" :items="armor" />
      <me-cs-equipment-gear-list v-if="[0, 3].includes(tab)" :items="gear" />
    </div>

    <me-standard-dialog :shown="addEquipmentDialog" @close="addEquipmentDialog = false">
      <template #title>
        Add Equipment
      </template>
      <me-cs-equipment-adder />
    </me-standard-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsEquipment',
  data () {
    return {
      tab: 0,
      tabs: ['All', 'Weapons', 'Armor', 'Other'],
      addEquipmentDialog: false,
      customArmorDialog: false
    }
  },
  computed: {
    ...mapGetters({ character: 'character', weapons: 'equipment/weapons', armor: 'equipment/armor', gear: 'equipment/gear' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    credits: {
      get () {
        return this.$options.filters.groupDigits(this.character.currentStats.credits, ',')
      },
      set (value) {
        this.setMinZeroInt(value, 'credits', 100000000000000)
      }
    }
  },
  methods: {
    setMinZeroInt (input, attr, max) {
      let number = input.toString().replaceAll(',', '')
      number = parseInt(number, 10)
      if (isNaN(number) || number < 0 || number > max) {
        number = 0
      }
      const value = Math.max(number, 0)
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.${attr}`, value })
    },
    showTab (index) {
      if (this.tab === 0) {
        return true
      }
      return this.tab === index
    }
  }
}
</script>
