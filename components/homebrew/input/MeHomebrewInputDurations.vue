<template>
  <v-select
    v-model="duration"
    :items="durations"
    label="Duration"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputDurations',
  props: {
    selectedDuration: {
      type: Object,
      default: () => {
        return { length: 0, unit: 'instant' }
      }
    }
  },
  data () {
    return {
      durations: [
        { value: 0, text: 'Instantaneous', objectValue: { length: 0, unit: 'instant' } },
        { value: 1, text: '1 Turn', objectValue: { length: 1, unit: 'turn' } },
        { value: 6, text: '1 Round', objectValue: { length: 1, unit: 'round' } },
        { value: 60, text: '1 Minute', objectValue: { length: 1, unit: 'minute' } },
        { value: 600, text: '10 Minutes', objectValue: { length: 10, unit: 'minute' } },
        { value: 3600, text: '1 Hour', objectValue: { length: 1, unit: 'hour' } },
        { value: 99999, text: '1 day', objectValue: { length: 24, unit: 'hour' } }
      ]
    }
  },
  computed: {
    duration: {
      get () {
        return this.durations.find(i => i.objectValue.length === this.selectedDuration.length && i.objectValue.unit === this.selectedDuration.unit)
      },
      set (value) {
        const selected = this.durations.find(i => i.value === value)
        if (selected) {
          this.$emit('update', selected.objectValue)
        }
      }
    }
  }
}
</script>
