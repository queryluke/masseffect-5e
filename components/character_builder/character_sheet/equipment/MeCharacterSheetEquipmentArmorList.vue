<template>
  <div>
    <me-character-sheet-equipment-adder type="armor" />
    <div class="text-center mt-1 mb-5">
      <v-btn small @click="createCustomArmor">
        <v-icon>mdi-plus</v-icon> Custom
      </v-btn>
    </div>
    <v-list dense two-line>
      <template v-for="item in csArmor">
        <me-character-sheet-equipment-list-item :key="`armor-${item.id}`" :item="item" :tabs="item.custom ? [{ title: 'Info', slot: 'infoTab' }, { title: 'Mods', slot: 'modTab' }] : [{ title: 'Info', slot: 'infoTab' }]">
          <template #infoTab>
            <me-character-sheet-equipment-armor-info :item="item" />
          </template>
          <template #modTab>
            <me-character-sheet-equipment-armor-mods v-if="item.custom" :item="item" />
          </template>
        </me-character-sheet-equipment-list-item>
      </template>
    </v-list>
    <v-dialog v-model="creatingArmor">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Add Custom Armor
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="creatingArmor = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="customArmor.name" label="Name" />
            </v-col>
            <v-col cols="6">
              <v-select v-model="customArmor.placement" :items="armorPlacements.filter(i => i.value !== 'body_armor')" label="Placement" />
            </v-col>
            <v-col cols="6">
              <v-select v-model="customArmor.type" :items="armorTypes" label="Type" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="customArmor.notes" rows="1" auto-grow label="Notes / Description" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="addCustomArmor">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
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
        id: this.customArmor.name.replaceAll(/\W/g, '-') + new Date().getTime()
      }
      this.addEquipment('armor', customArmor)
      this.creatingArmor = false
    }
  }
}
</script>
