<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="12" sm="6">
        <v-switch v-if="!alwaysOn" v-model="hasResource" :label="label" />
      </v-col>
      <v-col cols="12" :sm="alwaysOn ? 12 : 6">
        <v-select
          v-if="hasResource"
          v-model="displayType"
          :items="displayTypeOptions"
          label="Display Type"
          :hint="displayTypeHint"
          persistent-hint
        />
      </v-col>
    </v-row>
    <v-row v-if="hasResource && ['counter', 'checkbox'].includes(displayType)">
      <v-col cols="12" sm="6">
        <v-select
          v-model="reset"
          :items="resetOptions"
          label="Reset"
          :hint="resetHint"
          persistent-hint
        />
      </v-col>
      <v-col v-if="displayType === 'counter'" cols="12" sm="6">
        <v-radio-group v-model="resetTo" row mandatory hide-details label="Reset To">
          <v-radio label="Minimum" value="min" />
          <v-radio label="Max" value="max" />
        </v-radio-group>
        <p class="text-caption">
          Choose Max when you want the number of resources available to reset to their maximum. For example,
          Hex Shield has 50 hit points. When reset it should go to 50 hit points instead of 0.
        </p>
      </v-col>
      <v-col cols="12">
        <v-card outlined class="pa-3">
          <slot name="resourceMaxDescription" />
          <me-homebrew-input-bonus :bonus="max" always-on @update="max = $event" />
        </v-card>
      </v-col>
      <v-col v-if="displayType === 'counter'" cols="12">
        <v-text-field
          v-model="increment"
          type="number"
          min="1"
          label="Increment"
          hint="When clicking the + or - button of the counter display, this will add/remove the increment amount"
          persistent-hint
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="resourceLabel"
          label="Custom Label Text"
          clearable
        />
        <p class="text-caption">
          By default, a resource will show " / long rest" or " / short rest" if you have the long or short selected as
          the reset. Otherwise, no label will be shown. You may customize the text here.
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputResource',
  props: {
    resource: {
      type: [Object, Boolean],
      default: false
    },
    label: {
      type: String,
      default: 'Has Limited Uses?'
    },
    alwaysOn: {
      type: Boolean,
      default: false
    },
    excludedDisplayTypes: {
      type: Array,
      default: () => []
    },
    castable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultResource: {
        displayType: 'checkbox',
        reset: 'long',
        resetTo: 'min',
        max: {
          type: 'flat',
          value: 1,
          min: 0
        },
        increment: 1,
        label: false
      },
      baseDisplayTypes: [
        { value: 'counter', text: 'Counter', help: 'Displays a number with +/- buttons' },
        { value: 'checkbox', text: 'Checkbox', help: 'Displays checkboxes' },
        { value: 'hit-dice', text: 'Hit Die Tracker', help: 'Displays the character\'s hit dice options' },
        { value: 'omni-gel', text: 'Omni-gel Tracker', help: 'Displays the character\'s available omni-gel as a Counter display' },
        { value: 'barrier-ticks', text: 'Barrier Ticks', help: 'Displays the character\'s available Barrier Ticks as a checkbox display' },
        { value: 'gear-consumable', text: 'Gear Consumable', help: 'Displays available uses of this specific item' }
      ],
      baseResetTypes: [
        { value: 'short', text: 'Short Rest', help: 'Resets on a short rest' },
        { value: 'long', text: 'Long Rest', help: 'Resets on a long rest' },
        { value: 'manual', text: 'Manual', help: 'Displays a refresh button next to the resource' },
        { value: 'off', text: 'Off', help: 'Can only be reset by interacting with the resource display (e.g. checkbox, hit dice, etc)' }
      ]
    }
  },
  computed: {
    homebrewId () {
      return this.$route.query.id
    },
    hasResource: {
      get () {
        return !!this.resource
      },
      set (value) {
        const baseResource = value ? { ...this.defaultResource, id: this.homebrewId } : false
        this.$emit('update', baseResource)
      }
    },
    displayTypeOptions () {
      return this.baseDisplayTypes.filter(i => !this.excludedDisplayTypes.includes(i.value))
    },
    displayType: {
      get () {
        return this.resource?.displayType
      },
      set (value) {
        let newResource
        switch (value) {
          case 'omni-gel':
          case 'barrier-ticks':
          case 'hit-dice':
          case 'gear-consumable':
            newResource = {
              displayType: value,
              reset: 'off',
              label: value === 'barrier-ticks' ? 'Barrier Ticks' : false
            }
            break
          default:
            newResource = { ...this.resource, displayType: value }
        }
        this.$emit('update', newResource)
      }
    },
    displayTypeHint () {
      return this.baseDisplayTypes.find(i => i.value === this.displayType)?.help || ''
    },
    reset: {
      get () {
        return this.resource?.reset
      },
      set (value) {
        this.$emit('update', { ...this.resource, reset: value })
      }
    },
    resetOptions () {
      return this.castable ? [{ value: 'cast', text: 'On Cast', help: 'Resets when the power is cast' }, ...this.baseResetTypes] : this.baseResetTypes
    },
    resetHint () {
      return this.resetOptions.find(i => i.value === this.reset)?.help || ''
    },
    resetTo: {
      get () {
        return this.resource?.resetTo
      },
      set (value) {
        this.$emit('update', { ...this.resource, resetTo: value })
      }
    },
    max: {
      get () {
        return this.resource?.max
      },
      set (value) {
        this.$emit('update', { ...this.resource, max: value })
      }
    },
    increment: {
      get () {
        return this.resource?.increment
      },
      set (value) {
        const parsed = parseInt(value)
        if (parsed) {
          this.$emit('update', { ...this.resource, increment: parsed })
        }
      }
    },
    resourceLabel: {
      get () {
        return this.resource?.label || null
      },
      set (value) {
        this.$emit('update', { ...this.resource, label: value || false })
      }
    }
  }
}
</script>
