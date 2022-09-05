<template>
  <v-row>
    <v-col cols="12" sm="5">
      <v-text-field
        v-model="length"
        :disabled="unit === 'instant'"
        type="number"
        min="0"
        filled
        dense
        label="Length of Time"
      />
    </v-col>
    <v-col cols="12" sm="7">
      <v-select
        v-model="unit"
        :items="units"
        filled
        dense
        label="Unit"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeHomebrewInputDuration',
  props: {
    duration: {
      type: Object,
      default: () => {
        return { length: 0, unit: 'instant' }
      }
    }
  },
  data () {
    return {
      units: [
        { value: 'instant', text: 'Instantaneous' },
        { value: 'turn', text: 'Turn' },
        { value: 'round', text: 'Round' },
        { value: 'minute', text: 'Minute' },
        { value: 'hour', text: 'Hour' },
        { value: 'day', text: 'Day' }
      ]
    }
  },
  computed: {
    length: {
      get () {
        return this.duration?.length
      },
      set (value) {
        const parsed = parseInt(value)
        if (parsed) {
          this.$emit('update', { ...this.duration, length: parsed })
        }
      }
    },
    unit: {
      get () {
        return this.duration?.unit
      },
      set (value) {
        if (value === 'instant') {
          this.$emit('update', { length: 0, unit: 'instant' })
        } else {
          this.$emit('update', { length: this.length || 1, unit: value })
        }
      }
    }
  }
}
</script>
