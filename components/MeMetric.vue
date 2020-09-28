<template>
  <span>{{ displayText }}</span>
</template>

<script>
export default {
  name: 'MeMetric',
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
    }
  },
  data () {
    return {
      imperials: [
        {
          abbr: 'ft',
          singular: 'foot',
          plural: 'feet',
          convertsTo: 'm',
          conversion: (value) => {
            const converted = (parseInt(value, 10) / 5) * 2
            return converted > 20 ? (Math.round(converted / 10) * 10) : converted
          }
        },
        {
          abbr: 'mi',
          singular: 'mile',
          plural: 'miles',
          convertsTo: 'km',
          conversion: (value) => {
            return Math.round(parseInt(value, 10) * 1.6)
          }
        },
        {
          abbr: 'in',
          singular: 'inch',
          plural: 'inches',
          convertsTo: 'cm',
          conversion: (value) => {
            return Math.round(parseInt(value, 10) * 2.54)
          }
        },
        {
          abbr: 'lb',
          singular: 'pound',
          plural: 'pounds',
          convertsTo: 'kg',
          conversion: (value) => {
            return Math.round(parseInt(value, 10) / 2.204)
          }
        }
      ],
      metrics: [
        {
          abbr: 'm',
          singular: 'meter',
          plural: 'meters',
          convertsTo: 'm',
          conversion: (value) => {
            return Math.round((parseInt(value, 10) / 2) * 5)
          }
        },
        {
          abbr: 'km',
          singular: 'kilometer',
          plural: 'kilometers',
          convertsTo: 'mi',
          conversion: (value) => {
            return Math.round(parseInt(value, 10) / 1.6)
          }
        },
        {
          abbr: 'cm',
          singular: 'centimeter',
          plural: 'centimeters',
          convertsTo: 'in',
          conversion: (value) => {
            return Math.round(parseInt(value, 10) / 2.54)
          }
        },
        {
          abbr: 'kg',
          singular: 'kilogram',
          plural: 'kilograms',
          convertsTo: 'lb',
          conversion: (value) => {
            return Math.round(parseInt(value, 10) * 2.204)
          }
        }
      ]
    }
  },
  computed: {
    imperial () {
      return this.$store.getters['user/imperial']
    },
    imperialList () {
      return this.imperials.map(i => i.abbr)
    },
    metricList () {
      return this.metrics.map(i => i.abbr)
    },
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
      let value = ''
      let hyphen = ''
      let unitText = ''
      let text = ''
      if (this.shouldConvert) {
        const conversionSearch = this.isImperial ? this.metrics : this.imperials
        const conversionObject = conversionSearch.find(i => i.abbr === this.unitObject.convertsTo)
        value = this.unitObject.conversion(this.value)
        unitText = this.abbr ? conversionObject.abbr
          : this.adj || value === 1 ? conversionObject.singular : conversionObject.plural
      } else {
        value = parseInt(this.value, 10)
        unitText = this.abbr ? this.unitObject.abbr
          : this.adj || value === 1 ? this.unitObject.singular : this.unitObject.plural
      }
      text = this.override ? this.override.replace('{metric}', unitText) : unitText
      hyphen = this.adj ? '-' : ' '
      return `${value}${hyphen}${text}`
    }
  }
}
</script>