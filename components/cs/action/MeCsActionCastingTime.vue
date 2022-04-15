<template>
  <me-cs-action-stat>
    <me-cs-action-notes-tooltip v-if="castingTime.reaction" :note="{ tooltipText: castingTime.reaction, isHtml: true }">
      {{ baseCt }}
    </me-cs-action-notes-tooltip>
    <span v-else>
      {{ baseCt }}
    </span>
    <template v-if="altCasting && altCasting.length" #subtitle>
      <span v-for="(altCast, index) of altCasting" :key="`altCast-${index}`">
        <me-cs-action-notes-tooltip v-if="altCast.reaction" :note="{ tooltipText: altCast.reaction, isHtml: true }">
          {{ $t(`times.${altCast.unit}_abbr`, { n: altCast.length }) }}
        </me-cs-action-notes-tooltip>
        <span v-else>
          {{ $t(`times.${altCast.unit}_abbr`, { n: altCast.length }) }}
        </span>
        <span v-if="index < altCasting.length - 1" class="px-1">|</span>
      </span>
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
    }
  }
}
</script>
