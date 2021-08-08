<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Equipment
    </me-character-sheet-card-title>
    <v-chip-group v-model="tab" active-class="primary--text">
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`feature-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <me-character-sheet-equipment-weapon-list />
      </v-tab-item>
      <v-tab-item>
        <me-character-sheet-equipment-armor-list />
      </v-tab-item>
      <v-tab-item>
        <me-character-sheet-equipment-gear-list />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      tab: 0,
      tabs: ['Weapons', 'Armor', 'Other'],
      creatingArmor: false,
      customArmor: {
        placement: null,
        name: null,
        type: null,
        notes: null
      }
    }
  },
  methods: {
    createCustomArmor () {
      this.creatingArmor = true
      this.customArmor = { placement: null, name: null, type: null, notes: null }
    },
    addCustomArmor () {
      if (!this.customArmor.name || !this.customArmor.type || !this.customArmor.placement) {
        return
      }
      const customArmor = {
        placement: this.customArmor.placement,
        name: this.customArmor.name,
        type: this.customArmor.type,
        notes: this.customArmor.notes,
        custom: true,
        id: this.customArmor.name.replaceAll(/\W/g, '-') + new Date().toISOString()
      }
      this.addEquipment('armor', customArmor)
      this.creatingArmor = false
    }
  }
}
</script>
