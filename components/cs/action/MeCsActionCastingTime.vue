<template>
  <me-cs-action-stat>
    {{ baseCt }}
    <template v-if="additionalCt" #subtitle>
      {{ additionalCt }}
    </template>
  </me-cs-action-stat>
</template>
<script>
export default {
  name: 'MeCsActionCastingTime',
  props: {
    castingTime: {
      type: Object,
      default: () => {
        return {
          length: 1,
          unit: 'action'
        }
      }
    },
    altCasting: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    baseCt () {
      return this.$t(`times.${this.castingTime.unit}_abbr`, { n: this.castingTime.length })
    },
    additionalCt () {
      if (this.altCasting.length) {
        return this.altCasting.map(i => this.$t(`times.${i.unit}_abbr`, { n: i.length })).join(' | ')
      }
      return false
    }
  }
}
</script>
