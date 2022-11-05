<template>
  <v-select
    v-model="selectedAbility"
    :items="options"
    :label="label"
    :multiple="multiple"
    filled
    dense
    :chips="multiple"
    :small-chips="multiple"
    :disabled="!!disabled"
    :persistent-hint="!!disabled"
    :hint="disabled || undefined"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputAbility',
  props: {
    ability: {
      type: [String, Boolean, Array],
      default: false
    },
    includePcMod: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Ability'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    excludeNone: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      baseOptions: [
        { text: 'Strength', value: 'str' },
        { text: 'Dexterity', value: 'dex' },
        { text: 'Constitution', value: 'con' },
        { text: 'Intelligence', value: 'int' },
        { text: 'Wisdom', value: 'wis' },
        { text: 'Charisma', value: 'cha' }
      ]
    }
  },
  computed: {
    options () {
      const options = [...this.baseOptions]
      if (this.includePcMod) {
        options.push({ text: 'Powercasting Mod', value: 'pc' })
      }
      if (!this.multiple && !this.excludeNone) {
        options.unshift({ text: 'None', value: false })
      }
      return options
    },
    selectedAbility: {
      get () {
        return this.ability
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
