<template>
  <div>
    <!-- TOGGLE SWITCH -->
    <v-row no-gutters>
      <v-col cols="12">
        <v-switch v-if="!alwaysOn" v-model="hasBonus" :label="label" />
      </v-col>
    </v-row>

    <!-- Bonus Selection -->
    <v-row v-if="hasBonus" class="mt-n4">
      <v-col cols="12" sm="6">
        <v-select
          v-model="type"
          :items="bonusOptions"
          label="Type"
          :hint="selectedBonusHelp"
          persistent-hint
          class="mb-3"
          filled
          dense
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="type === 'flat'"
          v-model="flatValue"
          type="number"
          min="1"
          :label="selectedBonusLabel"
          filled
          dense
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
        <v-switch v-if="['hp', 'shields', 'barrierTicks'].includes(type)" v-model="hpValue" :label="hpValue ? 'Current' : 'Max'" />
      </v-col>
    </v-row>

    <!-- Progressive Options -->
    <v-row v-if="type === 'progressive'" no-gutters>
      <v-col
        v-for="(value, level) of progressiveValue"
        :key="`pv-${level}`"
        cols="12"
        sm="4"
        md="3"
        class="px-2"
      >
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
      <v-col cols="12">
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
    </v-row>

    <!-- MULTI BONUS -->
    <v-row v-if="type === 'multi'" no-gutters>
      <v-col v-for="(mb, index) of multiBonusValue" :key="`mbv-${index}`" cols="12">
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
      <v-col cols="12">
        <div class="text-center">
          <v-btn color="primary" @click="addMultiBonusValue">
            Add Bonus
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- ADVANCED OPTIONS -->
    <div v-if="hasBonus" class="d-flex my-3 align-center">
      <v-divider class="ml-8" />
      <div class="px-4 text-caption">
        Final Value Adjustments
      </div>
      <v-divider class="mr-8" />
    </div>

    <v-row v-if="hasBonus">
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="min"
              type="number"
              min="0"
              label="Minimum value"
              hide-details
              filled
              dense
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="multiplier"
              type="float"
              min="0"
              label="Multiplier"
              hide-details
              filled
              dense
            >
              <template #append>
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
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-radio-group v-model="round" :row="$vuetify.breakpoint.mdAndUp" mandatory hide-details label="Round">
          <v-radio label="Down" value="down" />
          <v-radio label="Up" value="up" />
        </v-radio-group>
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
        { value: 'mod', text: 'Ability Mod', help: 'A value equal to the characters STR, DEX, CON, INT, WIS, or CHA', defaultValue: 'str', label: 'Ability Mod' },
        { value: 'modComparison', text: 'Ability Mod Comparison', help: 'Look at two ability score mods from a character and take the higher of the two', defaultValue: [], label: 'Ability Mods' },
        { value: 'powercastingMod', text: 'Powercasting Mod', help: 'Equal to the powercasting modifier of the selected class', defaultValue: 'adept' },
        { value: 'proficiency', text: 'Proficiency Bonus', help: 'Equal to the character\'s proficiency bonus', defaultValue: null },
        { value: 'level', text: 'Level', help: 'Equal to the character\'s total levels, or total levels of an indicated class', defaultValue: null },
        { value: 'hp', text: 'Hit Points', help: 'Equal to character\'s current or maximum hit points', defaultValue: 'max' },
        { value: 'shields', text: 'Shields', help: 'Equal to the character\'s current or maximum shield points', defaultValue: 'max' },
        { value: 'barrierTicks', text: 'Barrier Ticks', help: 'Equal to the character\'s current or maximum barrier ticks', defaultValue: 'max' },
        { value: 'barrierDieCount', text: 'Barrier Dice Count', help: 'Equal to the character\'s default barrier dice count', defaultValue: null },
        { value: 'barrierDieType', text: 'Barrier Dice Type', help: 'Equal to the character\'s default barrier dice type (e.g. d8, d10, etc)', defaultValue: null },
        { value: 'progressive', text: 'Progressive', help: 'Manually set a flat numeric amount at specific levels', defaultValue: { 1: 1 } },
        { value: 'multi', text: 'Multiple', help: 'The summation of multiple bonuses', defaultValue: [{ type: 'flat', value: 1, multiplier: 1, min: 1, round: 'down', limit: null }] }
        // { value: 'resource', text: 'Resource', help: 'Equal to the amount remaining in a resource pool, such as tech armor hit points', defaultValue: null, label: 'Resource' }
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
    hpValue: {
      get () {
        return this.bonus?.value !== 'max'
      },
      set (value) {
        const trueValue = value ? 'current' : 'max'
        this.$emit('update', { ...this.bonus, value: trueValue })
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
