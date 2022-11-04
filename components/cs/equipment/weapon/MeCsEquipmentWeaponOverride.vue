<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="name"
        label="Custom Name"
        :append-icon="!!item.overrides.name ? 'mdi-close' : undefined"
        @click:append="clearOverride('name')"
        @change="debouncedNameChange()"
      />
    </v-col>
    <v-col cols="6">
      <me-cb-debounced-number-input
        label="Heat"
        :current="itemData.heat || 0"
        :max="999"
        :clearable="!!item.overrides.heat"
        hide-icons
        @set="changeStat('overrides.heat', $event)"
        @clear="clearOverride('heat')"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        :items="rangeOptions"
        :value="itemData.range.short"
        label="Range"
        outlined
        dense
        hide-details
        :append-icon="item.overrides.range ? 'mdi-close' : undefined"
        @click:append="clearOverride('range')"
        @change="changeRange($event)"
      />
    </v-col>
    <v-col cols="3">
      <me-cb-debounced-number-input
        :current="itemData.damage.dieCount"
        label="# Dice"
        :max="20"
        :clearable="item.overrides.damage && !!item.overrides.damage.dieCount"
        hide-icons
        @set="changeStat('overrides.damage.dieCount', $event)"
        @clear="clearOverride('damage.dieCount')"
      />
    </v-col>
    <v-col cols="4">
      <v-select
        :items="[{text: 'd4', value: 4}, {text: 'd6', value: 6}, {text: 'd8', value: 8}, {text: 'd10', value: 10}, {text: 'd12', value: 12}]"
        :value="itemData.damage.dieType"
        label="Dice"
        outlined
        dense
        hide-details
        :append-icon="item.overrides.damage && item.overrides.damage.dieType ? 'mdi-close' : undefined"
        @click:append="clearOverride('damage.dieType')"
        @change="changeStat('overrides.damage.dieType', $event)"
      />
    </v-col>
    <v-col cols="5">
      <v-select
        :items="damageTypes"
        :value="itemData.damage.type"
        label="Type"
        outlined
        dense
        hide-details
        :append-icon="item.overrides.damage && item.overrides.damage.type ? 'mdi-close' : undefined"
        @click:append="clearOverride('damage.type')"
        @change="changeStat('overrides.damage.type', $event)"
      />
    </v-col>
    <v-col cols="6">
      <me-cb-debounced-number-input
        label="+ Damage"
        :current="itemData.bonusDamage || 0"
        :max="999"
        :clearable="itemData.bonusDamage > 0"
        hide-icons
        @set="changeStat('bonusDamage', $event)"
        @clear="changeStat('bonusDamage', 0)"
      />
    </v-col>
    <v-col cols="6">
      <me-cb-debounced-number-input
        label="+ Hit"
        :current="itemData.bonusHit || 0"
        :max="999"
        :clearable="itemData.bonusHit > 0"
        hide-icons
        @set="changeStat('bonusHit', $event)"
        @clear="changeStat('bonusHit', 0)"
      />
    </v-col>
    <v-col cols="12">
      <v-select
        :items="weaponProperties"
        :value="itemData.properties"
        item-text="name"
        item-value="id"
        label="Properties"
        multiple
        chips
        deletable-chips
        small-chips
        :append-icon="item.overrides.properties ? 'mdi-close' : undefined"
        @click:append="clearOverride('properties')"
        @change="changeStat('overrides.properties', $event)"
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
import { debounce, set as setAttr, cloneDeep, unset as unsetAttr } from 'lodash'
import { DamageTypes } from '~/mixins/labels/DamageTypes'
export default {
  name: 'MeCsEquipmentWeaponOverride',
  mixins: [DamageTypes],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cachedName: null,
      ranges: [
        5,
        10,
        15,
        20,
        25,
        30,
        35,
        40,
        60,
        75,
        90,
        120,
        150,
        300,
        500
      ]
    }
  },
  computed: {
    weaponProperties () {
      return this.$store.getters.getData('weapon-properties')
    },
    itemData () {
      return this.item.data
    },
    name: {
      get () {
        return this.itemData.name
      },
      set (value) {
        this.cachedName = value
      }
    },
    imperial () {
      return this.$store.getters['user/imperial']
    },
    rangeOptions () {
      return this.ranges.map((i) => {
        return {
          text: this.imperial ? `${i}ft` : `${(i / 5) * 2}m`,
          value: i
        }
      })
    }
  },
  created () {
    this.debouncedNameChange = debounce(() => {
      this.nameChange()
    }, 1000)
  },
  methods: {
    resetStats () {
      const changeItem = { ...this.item, overrides: {} }
      this.updateWeapon(changeItem)
    },
    nameChange () {
      this.changeStat('overrides.name', this.cachedName)
    },
    clearOverride (stat) {
      const replacement = cloneDeep(this.item)
      unsetAttr(replacement, `overrides.${stat}`)
      this.updateWeapon(replacement)
    },
    changeStat (path, value) {
      const replacement = cloneDeep(this.item)
      setAttr(replacement, path, value)
      this.updateWeapon(replacement)
    },
    changeRange (value) {
      const replacement = cloneDeep(this.item)
      const newRange = {
        short: value
      }
      if (this.itemData.type !== 'melee') {
        newRange.long = value * (this.itemData.type === 'shotgun' ? 2 : 3)
      }
      setAttr(replacement, 'overrides.range', newRange)
      this.updateWeapon(replacement)
    },
    updateWeapon (replacement) {
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: this.item.uuid, replacement })
    }
  }
}
</script>
