<template>
  <v-select
    v-model="selectedDieType"
    :items="options"
    :label="label"
    :multiple="multiple"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputDieType',
  props: {
    dieType: {
      type: [String, Boolean, Number, Array],
      default: false
    },
    label: {
      type: String,
      default: 'Die Type'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    includeNone: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      baseOptions: [
        { text: 'd4', value: 4 },
        { text: 'd6', value: 6 },
        { text: 'd8', value: 8 },
        { text: 'd10', value: 10 },
        { text: 'd12', value: 12 }
      ]
    }
  },
  computed: {
    options () {
      const options = [...this.baseOptions]
      if (this.includeNone) {
        options.unshift({ text: 'None', value: 0 })
      }
      return options
    },
    selectedDieType: {
      get () {
        return this.dieType
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
