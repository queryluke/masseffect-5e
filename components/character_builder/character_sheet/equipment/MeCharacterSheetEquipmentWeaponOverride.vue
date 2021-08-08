<template>
  <v-row>
    <v-col cols="6">
      <v-text-field :disabled="itemData.type === 'melee'" :value="item.stats.heat" label="Heat" @change="changeItemStat('heat', $event)" />
    </v-col>
    <v-col cols="6">
      <v-text-field v-model="weaponRange" label="Range" />
    </v-col>
    <v-col cols="3">
      <v-text-field :value="item.stats.damage.dieCount" label="# Dice" @change="changeWeaponDamage('dieCount', $event)" />
    </v-col>
    <v-col cols="4">
      <v-select
        :items="[{text: 'd4', value: 4}, {text: 'd6', value: 6}, {text: 'd8', value: 8}, {text: 'd10', value: 10}, {text: 'd12', value: 12}]"
        :value="item.stats.damage.dieType"
        label="Dice"
        @change="changeWeaponDamage('dieType', $event)"
      />
    </v-col>
    <v-col cols="5">
      <v-select
        :items="damageTypes"
        :value="item.stats.damage.type"
        label="Type"
        @change="changeWeaponDamage('type', $event)"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field :value="item.bonusDamage" label="+ Damage" @change="changeRootStat('bonusDamage', $event || 0)" />
    </v-col>
    <v-col cols="6">
      <v-text-field :value="item.bonusHit" label="+ Hit" @change="changeRootStat('bonusHit', $event || 0)" />
    </v-col>
    <v-col cols="12">
      <v-autocomplete
        :items="weaponProperties"
        :value="item.stats.properties"
        item-text="name"
        item-value="id"
        label="Properties"
        multiple
        chips
        deletable-chips
        small-chips
        @change="changeItemStat('properties', $event)"
      />
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn small @click="resetStats">
        Reset
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemData () {
      return this.equipmentData(this.item.type, this.item.id)
    },
    weaponRange: {
      get () {
        if (this.$store.getters['user/imperial']) {
          return this.item.stats.range
        } else {
          const converted = (parseInt(this.item.stats.range, 10) / 5) * 2
          return converted >= 2 || converted === 0
            ? converted
            : converted === 0.4
              ? 0.5
              : converted === 0.8
                ? 1
                : 1.5
        }
      },
      set (value) {
        if (this.$store.getters['user/imperial']) {
          this.changeItemStat('range', value)
        } else {
          const minVal = value < 2 ? 2 : value
          const converted = Math.ceil((parseInt(minVal, 10) / 2) * 5)
          this.changeItemStat('range', converted)
        }
      }
    }
  },
  methods: {
    resetStats () {
      const changeItem = { ...this.item, stats: { heat: this.itemData.heat, range: this.itemData.range, damage: this.itemData.damage, properties: this.itemData.properties } }
      this.removeEquipment(this.item.type, this.item.uuid, changeItem)
    },
    changeWeaponDamage (stat, value) {
      const changeItem = { ...this.item, stats: { ...this.item.stats, damage: { ...this.item.stats.damage, [stat]: value } } }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    },
    changeRootStat (stat, value) {
      const changeItem = { ...this.item, [stat]: value }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    },
    changeItemStat (stat, value) {
      const changeItem = { ...this.item, stats: { ...this.item.stats, [stat]: value } }
      this.removeEquipment('weapon', this.item.uuid, changeItem)
    }
  }
}
</script>
