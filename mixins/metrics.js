export const Metrics = {
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
            return converted >= 2 || converted === 0
              ? converted
              : converted === 0.4
                ? 0.5
                : converted === 0.8
                  ? 1
                  : 1.5
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
    }
  }
}
