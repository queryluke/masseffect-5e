<template>
  <v-select
    v-model="type"
    :items="damageTypes"
    :multiple="multiple"
    :label="label"
    :hint="hint"
    :persistent-hint="hint !== ''"
    :clearable="clearable"
    :chips="multiple"
    :small-chips="multiple"
    filled
    dense
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputDamageType',
  props: {
    selected: {
      type: [Array, String, Boolean],
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Damage Type'
    },
    hint: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    includeHealing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: true,
      baseDamageTypes: [
        { value: 'acid', text: 'Acid' },
        { value: 'bludgeoning', text: 'Bludgeoning' },
        { value: 'cold', text: 'Cold' },
        { value: 'fire', text: 'Fire' },
        { value: 'force', text: 'Force' },
        { value: 'lightning', text: 'Lightning' },
        { value: 'necrotic', text: 'Necrotic' },
        { value: 'piercing', text: 'Piercing' },
        { value: 'poison', text: 'Poison' },
        { value: 'psychic', text: 'Psychic' },
        { value: 'radiant', text: 'Radiant' },
        { value: 'slashing', text: 'Slashing' },
        { value: 'thunder', text: 'Thunder' }
      ],
      healingTypes: [
        { value: 'hp', text: 'Heal (hit points)' },
        { value: 'sp', text: 'Regen/Shield Points' },
        { value: 'tempHp', text: 'Temp Hit Points' }
      ]
    }
  },
  computed: {
    damageTypes () {
      return this.includeHealing ? [...this.baseDamageTypes, ...this.healingTypes] : this.baseDamageTypes
    },
    type: {
      get () {
        return this.selected
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
