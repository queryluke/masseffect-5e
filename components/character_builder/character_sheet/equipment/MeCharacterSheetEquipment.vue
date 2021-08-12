<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Equipment
    </me-character-sheet-card-title>
    <v-row class="my-2">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="credits"
          label="Credits"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="medigel"
          outlined
          label="Medi-gel"
          dense
          hide-details
          append-outer-icon="mdi-plus"
          prepend-icon="mdi-minus"
          @click:append-outer="medigel++"
          @click:prepend="medigel--"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="omnigel"
          label="Omni-gel"
          outlined
          dense
          hide-details
          append-outer-icon="mdi-plus"
          prepend-icon="mdi-minus"
          @click:append-outer="omnigel++"
          @click:prepend="omnigel--"
        />
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
  computed: {
    credits: {
      get () {
        return this.character.credits
      },
      set (value) {
        this.setMinZeroInt(value, 'credits')
      }
    },
    medigel: {
      get () {
        return this.character.medigel
      },
      set (value) {
        this.setMinZeroInt(value, 'medigel')
      }
    },
    omnigel: {
      get () {
        return this.character.omnigel
      },
      set (value) {
        this.setMinZeroInt(value, 'omnigel')
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
    },
    setMinZeroInt (input, attr) {
      const number = Number.parseInt(input, 10)
      if (Number.isNaN(number)) {
        return
      }
      const value = Math.max(number, 0)
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr, value })
    }
  }
}
</script>
