<template>
  <v-row>
    <v-col cols="12" class="text-right">
      <v-btn outlined small @click="$emit('remove')">
        Remove
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6">
      <me-cs-companion-debounced-text-input :value="action.name" label="Name" clearable @set="updateFeature('name', $event)" />
    </v-col>
    <v-col cols="12" sm="6">
      <me-cs-companion-select-input :value="action.type" label="Type" :items="['Attack', 'Action', 'Bonus Action', 'Reaction', 'Other']" multiple @set="updateFeature('name', $event)" />
    </v-col>
    <v-col cols="6" md="2">
      <me-cs-companion-debounced-text-input :value="action.dc" label="DC" clearable is-integer @set="updateFeature('dc', $event)" />
    </v-col>
    <v-col cols="6" md="2">
      <me-cs-companion-debounced-text-input :value="action.hit" label="To Hit" clearable is-integer @set="updateFeature('hit', $event)" />
    </v-col>
    <v-col cols="6" md="4">
      <me-cs-companion-debounced-text-input
        :value="action.resourceMax"
        label="Resource/Limited Use"
        clearable
        is-integer
        @set="updateFeature('resourceMax', $event)"
      />
    </v-col>
    <v-col cols="6" md="4">
      <me-cs-companion-select-input :value="action.resourceDisplay" label="Resource Display" :items="['Heat Tracker', 'Checkboxes', 'Counter']" @set="updateFeature('resourceDisplay', $event)" />
    </v-col>
    <v-col cols="12">
      <div class="text-subtitle-1 mt-5">
        Range
      </div>
      <v-divider class="mb-4" />
    </v-col>
    <v-col cols="12">
      <me-cs-companion-distance-input :value="action.shortRange" label="Short" :max="600" @set="updateFeature('shortRange', $event)" />
    </v-col>
    <v-col cols="12">
      <me-cs-companion-distance-input :value="action.longRange" label="Long" :max="600" @set="updateFeature('longRange', $event)" />
    </v-col>
    <v-col cols="12" md="8">
      <me-cs-companion-distance-input :value="action.aoeSize" label="AoE Size" :max="300" @set="updateFeature('aoeSize', $event)" />
    </v-col>
    <v-col cols="12" md="4">
      <me-cs-companion-select-input :value="action.aoeType" label="AoE Type" :items="['sphere', 'cube', 'cylinder', 'line', 'cone']" @set="updateFeature('aoeType', $event)" />
    </v-col>
    <v-col cols="12">
      <div class="text-subtitle-1 mt-5">
        Damage
      </div>
      <v-divider class="mb-4" />
    </v-col>
    <v-col cols="6" md="4">
      <me-cs-companion-debounced-text-input
        :value="action.dmgDieCount"
        label="# Dice"
        clearable
        is-integer
        @set="updateFeature('dmgDieCount', $event)"
      />
    </v-col>
    <v-col cols="6" md="4">
      <me-cs-companion-select-input :value="action.dmgDieType" label="Die" :items="dieTypes" @set="updateFeature('dieType', $event)" />
    </v-col>
    <v-col cols="6" md="4">
      <me-cs-companion-select-input :items="damageTypes" label="Type" :value="action.dmgType" multiple @set="updateFeature('dmgType', $event)" />
    </v-col>
    <v-col cols="12">
      <me-cs-companion-debounced-text-area-input :value="action.description" label="Description" @set="updateFeature('description', $event)" />
    </v-col>
  </v-row>
</template>

<script>
import { DamageTypes } from '~/mixins/labels/DamageTypes'
export default {
  name: 'MeCsCompanionActionForm',
  mixins: [DamageTypes],
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dieTypes: [
        { text: 'd4', value: 4 },
        { text: 'd6', value: 6 },
        { text: 'd8', value: 8 },
        { text: 'd10', value: 10 },
        { text: 'd12', value: 12 }
      ]
    }
  },
  methods: {
    updateFeature (attr, value) {
      const updatedFeature = JSON.parse(JSON.stringify(this.action))
      updatedFeature[attr] = value
      this.$emit('update', updatedFeature)
    }
  }
}
</script>
