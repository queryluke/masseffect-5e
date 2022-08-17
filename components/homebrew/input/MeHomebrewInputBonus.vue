<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="12" sm="4">
        <v-switch v-if="!alwaysOn" v-model="hasBonus" :label="label" />
      </v-col>
      <v-col cols="12" :sm="alwaysOn ? 12 : 6">
        <v-row>
          <v-col v-if="hasBonus" cols="12" sm="4">
            <v-text-field
              v-model="min"
              type="number"
              min="0"
              label="Minimum value"
              hide-details
            />
          </v-col>
          <v-col v-if="hasBonus" cols="12" sm="4">
            <v-text-field
              v-model="multiplier"
              type="float"
              min="0"
              label="Multiplier"
              hide-details
            >
              <template #append-outer>
                <v-tooltip bottom max-width="200">
                  <template #activator="{ on, attrs }">
                    <v-icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span>Final bonus value will be multiplied by this number. You may use decimals for things like 'half your level', e.g. 0.5</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
          <v-col v-if="hasBonus" cols="12" sm="4">
            <v-radio-group v-model="round" column mandatory hide-details label="Round">
              <v-radio label="Down" value="down" />
              <v-radio label="Up" value="up" />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="hasBonus">
      <v-col cols="12" sm="6">
        <v-select
          v-model="type"
          :items="bonusOptions"
          label="Type"
          :hint="selectedBonusHelp"
          persistent-hint
          class="mb-3"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="type === 'flat'"
          v-model="flatValue"
          type="number"
          min="1"
          :label="selectedBonusLabel"
        />
        <me-homebrew-input-ability v-if="['mod', 'modComparison'].includes(type)" :multiple="type === 'modComparison'" :ability="modValue" :label="selectedBonusLabel" @update="modValue = $event" />
        <me-homebrew-input-classes-select
          v-if="['level', 'progressive', 'powercastingMod'].includes(type)"
          label="Class"
          :selected="classStringValue"
          :hint="classSelectHint"
          :clearable="['level', 'progressive'].includes(type)"
          @update="classStringValue = $event"
        />
      </v-col>
      <v-col v-if="type === 'progressive'" cols="12">
        <v-row>
          <v-col v-for="(value, level) of progressiveValue" :key="`pv-${level}`" cols="12" sm="6">
            <v-card shaped outlined class="pa-2 my-2">
              <div class="d-flex justify-space-between">
                <div class="text-caption mb-2">
                  At {{ $t(`ordinal_numbers[${level}]`) }} Level
                </div>
                <v-btn icon small @click="removeProgressiveValue(level)">
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
              <v-text-field
                :value="value"
                type="number"
                min="1"
                label="Bonus"
                @change="updatePvValue(level, $event)"
              />
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-menu v-if="pvOptions.length" max-height="400px" offset-x>
            <template #activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">
                Add Level
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(pvOp, pvIndex) in pvOptions"
                :key="`newPvItem-${pvIndex}`"
                @click="addProgressiveValue(pvOp)"
              >
                <v-list-item-title>{{ $t(`ordinal_numbers[${pvOp}]`) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col v-if="type === 'multi'" cols="12">
        <v-row>
          <v-col v-for="(mb, index) of multiBonusValue" :key="`mbv-${index}`" cols="12" sm="6">
            <v-card shaped outlined class="pa-2 my-2">
              <div class="d-flex justify-space-between">
                <div class="text-caption mb-2">
                  Bonus #{{ index + 1 }}
                </div>
                <v-btn icon small color="error" @click="removeMultiBonusValue(index)">
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
              <me-homebrew-input-bonus always-on :bonus="mb" no-multi @update="updateMultiBonusValue(index, $event)" />
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn color="primary" @click="addMultiBonusValue">
            Add Bonus
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputBonus',
  props: {
    bonus: {
      type: [Object, Boolean],
      default: false
    },
    label: {
      type: String,
      default: 'Bonus?'
    },
    alwaysOn: {
      type: Boolean,
      default: false
    },
    noMulti: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultBonus: { type: 'flat', value: 1, multiplier: 1, min: 1, round: 'down', limit: null },
      bonusTypes: [
        { value: 'flat', text: 'Flat', help: 'A flat numeric value, e.g. +1, +5, or +10', defaultValue: 1, label: 'Amount' },
        { value: 'mod', text: 'Ability Mod', help: 'One of +STR, +DEX, +CON, +INT, +WIS, +CHA', defaultValue: 'str', label: 'Ability Mod' },
        { value: 'modComparison', text: 'Ability Mod Comparison', help: 'Equals the higher of the selected abilities', defaultValue: [], label: 'Ability Mods' },
        { value: 'proficiency', text: 'Proficiency Bonus', help: 'Equals the character\'s proficiency bonus', defaultValue: null },
        { value: 'level', text: 'Level', help: 'Equals the character\'s total levels, or total levels of an indicated class', defaultValue: null },
        { value: 'hp', text: 'Hit Points', help: 'Equals the character\'s hit points', defaultValue: null },
        { value: 'progressive', text: 'Progressive', help: 'Manual set the amount at specific levels', defaultValue: { 1: 1 } },
        { value: 'powercastingMod', text: 'Powercasting Mod', help: 'Equals the powercasting modifier of the selected class', defaultValue: 'adept' },
        { value: 'multi', text: 'Multiple', help: 'The summation of multiple values', defaultValue: [{ type: 'flat', value: 1, multiplier: 1, min: 1, round: 'down', limit: null }] }
      ],
      pvLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      anotherPvLevel: null
    }
  },
  computed: {
    hasBonus: {
      get () {
        return !!this.bonus
      },
      set (value) {
        const baseBonus = value ? { ...this.defaultBonus } : false
        this.$emit('update', baseBonus)
      }
    },
    bonusOptions () {
      return this.noMulti ? this.bonusTypes.filter(i => i.value !== 'multi') : this.bonusTypes
    },
    type: {
      get () {
        return this.bonus?.type
      },
      set (value) {
        const selected = this.bonusTypes.find(i => i.value === value)
        this.$emit('update', { ...this.bonus, type: value, value: selected.defaultValue, limit: null })
      }
    },
    selectedBonus () {
      return this.bonusTypes.find(i => i.value === this.type)
    },
    selectedBonusHelp () {
      return this.selectedBonus?.help
    },
    selectedBonusLabel () {
      return this.selectedBonus?.label
    },
    multiplier: {
      get () {
        return this.bonus?.multiplier
      },
      set (value) {
        const parsed = parseFloat(value)
        if (parsed) {
          this.$emit('update', { ...this.bonus, multiplier: parsed })
        }
      }
    },
    min: {
      get () {
        return this.bonus?.min
      },
      set (value) {
        const parsed = parseInt(value)
        if (parsed) {
          this.$emit('update', { ...this.bonus, min: parsed })
        }
      }
    },
    round: {
      get () {
        return this.bonus?.round
      },
      set (value) {
        this.$emit('update', { ...this.bonus, round: value })
      }
    },
    flatValue: {
      get () {
        return this.bonus?.value
      },
      set (value) {
        this.$emit('update', { ...this.bonus, value })
      }
    },
    modValue: {
      get () {
        return this.bonus?.value
      },
      set (value) {
        this.$emit('update', { ...this.bonus, value })
      }
    },
    classStringValue: {
      get () {
        return this.type === 'progressive' ? this.bonus?.limit : this.bonus?.value
      },
      set (value) {
        const key = this.type === 'progressive' ? 'limit' : 'value'
        this.$emit('update', { ...this.bonus, [key]: value })
      }
    },
    progressiveValue: {
      get () {
        return this.bonus?.value
      },
      set (value) {
        this.$emit('update', { ...this.bonus, value })
      }
    },
    pvOptions () {
      if (this.type !== 'progressive') {
        return []
      }
      const levels = Object.keys(this.progressiveValue)
      return this.pvLevels.filter(i => !levels.includes(i.toString()))
    },
    classSelectHint () {
      return ['level', 'progressive'].includes(this.type) ? 'Limit to class (optional, leave blank for total character level)' : ''
    },
    multiBonusValue: {
      get () {
        return this.bonus?.value
      },
      set (value) {
        this.$emit('update', { ...this.bonus, value })
      }
    }
  },
  methods: {
    addProgressiveValue (level) {
      this.progressiveValue = Object.assign({}, { ...this.progressiveValue, [level]: 1 })
      this.$nextTick(() => {
        this.anotherPvLevel = null
      })
    },
    removeProgressiveValue (level) {
      const newPv = Object.assign({}, this.progressiveValue)
      delete newPv[level]
      this.progressiveValue = newPv
    },
    updatePvValue (level, value) {
      const parsed = parseInt(value)
      if (parsed) {
        this.progressiveValue = Object.assign({}, { ...this.progressiveValue, [level]: parsed })
      }
    },
    addMultiBonusValue () {
      this.multiBonusValue.push({ ...this.defaultBonus })
    },
    removeMultiBonusValue (index) {
      const newMbv = this.multiBonusValue.slice()
      newMbv.splice(index, 1)
      this.multiBonusValue = newMbv
    },
    updateMultiBonusValue (index, value) {
      const newMbv = this.multiBonusValue.slice()
      newMbv.splice(index, 1, value)
      this.multiBonusValue = newMbv
    }
  }
}
</script>
