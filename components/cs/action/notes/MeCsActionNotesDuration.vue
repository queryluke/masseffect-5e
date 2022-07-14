<template>
  <me-cs-action-notes-tooltip v-if="durationStrings" :note="durationNote" :has-next="hasNext" />
</template>

<script>
export default {
  name: 'MeCsActionNotesDuration',
  props: {
    note: {
      type: Object,
      default: () => {
        return {
          duration: {
            length: false,
            unit: false
          },
          concentration: false
        }
      }
    },
    hasNext: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    duration () {
      return this.note.duration || false
    },
    durationStrings () {
      if (!this.duration || !this.duration.unit || !this.duration.length) {
        return false
      }
      return {
        abbr: 'D: ' + this.$t(`times.${this.duration.unit}_abbr`, this.duration.length, { n: this.duration.length }),
        full: this.$tc(`times.${this.duration.unit}`, this.duration.length, { n: this.duration.length })
      }
    },
    durationTooltipText () {
      return `${this.note.concentration ? 'Concentration, up to ' : 'Duration: '}${this.durationStrings.full}`
    },
    durationNote () {
      return {
        text: this.durationStrings.abbr,
        tooltipText: this.durationTooltipText
      }
    }
  }
}
</script>
