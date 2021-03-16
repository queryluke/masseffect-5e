<template>
  <me-metric
    :value="length"
    :unit="unit"
    :override="override"
    :abbr="abbr"
    :adj="adj"
    :num-only="numOnly"
    :text-if="textIf"
  />
</template>

<script>
export default {
  name: 'MeDistance',
  props: {
    length: {
      type: [Number, String],
      required: true
    },
    override: {
      type: [Boolean, String],
      default: false
    },
    adj: {
      type: Boolean,
      default: false
    },
    abbr: {
      type: Boolean,
      default: false
    },
    tiny: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
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
    unit () {
      return this.tiny
        ? 'in'
        : this.large
          ? 'mi'
          : 'ft'
    }
  }
}
</script>
