<template>
  <span>{{ displayText }}</span>
</template>

<script>
import { Metrics } from '~/mixins/metrics'
export default {
  name: 'MeMetric',
  mixins: [Metrics],
  props: {
    unit: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    adj: {
      type: Boolean,
      default: false
    },
    abbr: {
      type: Boolean,
      default: false
    },
    override: {
      type: [Boolean, String],
      default: false
    },
    numOnly: {
      type: Boolean,
      default: false
    },
    textIf: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    isImperial () {
      return this.imperialList.includes(this.unit)
    },
    shouldConvert () {
      return (this.imperial && !this.isImperial) || (!this.imperial && this.isImperial)
    },
    unitObject () {
      const searchIn = this.isImperial ? this.imperials : this.metrics
      return searchIn.find(i => i.abbr === this.unit)
    },
    displayText () {
      if (this.textIf) {
        if (this.imperial && this.textIf === 'imperial') {
          return this.override
        }
        if (this.textIf === 'metric' && !this.imperial) {
          return this.override
        }
        return ''
      }
      let value = ''
      let hyphen = ''
      let unitText = ''
      let text = ''
      if (this.shouldConvert) {
        const conversionSearch = this.isImperial ? this.metrics : this.imperials
        const conversionObject = conversionSearch.find(i => i.abbr === this.unitObject.convertsTo)
        value = this.unitObject.conversion(this.value)
        unitText = this.abbr
          ? conversionObject.abbr
          : this.adj || value === 1
            ? conversionObject.singular
            : conversionObject.plural
      } else {
        value = parseInt(this.value, 10)
        unitText = this.abbr
          ? this.unitObject.abbr
          : this.adj || value === 1
            ? this.unitObject.singular
            : this.unitObject.plural
      }
      if (this.numOnly) {
        return value
      }
      text = this.override ? this.override.replace('{metric}', unitText) : unitText
      hyphen = this.adj
        ? '-'
        : this.abbr
          ? ''
          : ' '
      if (value === 0) {
        value = ''
      }
      return `${value}${hyphen}${text}`
    }
  }
}
</script>
